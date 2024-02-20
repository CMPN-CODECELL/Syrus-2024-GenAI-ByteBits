from PIL import Image, ImageDraw, ImageFont, ImageColor
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
import warnings
import convertapi
import io
import cv2
import os


# Generate map in the format of {0: "speech", 1: "speech", ...} and {0: "person", 1: "person", ...}

def generate_map_from_text(text):

    d = {}
    who_spoke = {}
    dialogue = []
    speak = []
    l = text.split("\n")

    for word in l:
        i = 0
        if 'Scene' not in word and 'Act' not in word:
            if ':' in word:
                dialogue.append((word.split(':')[1]))
                speak.append((word.split(':')[0]))

        for i in range(len(dialogue)):
            d[i] = dialogue[i]
            who_spoke[i] = speak[i]
    return (d, who_spoke)

def stable_diff(stability_api, person, speech, name, features, cfg, step):

    answer = stability_api.generate(
        prompt=f"""
        Create a comic-style image where {person} says, "{speech}".
        Capture the expressions of the user from the dialogue.
        Add styles based on the following features {features}
        """,
        seed=992446758,
        steps=int(step),
        cfg_scale=int(cfg),
        width=512,
        height=512,
        samples=1,
        sampler=generation.SAMPLER_K_DPMPP_2M
    )

    folder_path = "./images"

    print(answer)

    for resp in answer:
        for artifact in resp.artifacts:
            if artifact.finish_reason == generation.FILTER:
                warnings.warn(
                    "Your request activated the API's safety filters and could not be processed."
                    "Please modify the prompt and try again.")

            if artifact.type == generation.ARTIFACT_IMAGE:
                image_path = os.path.join(folder_path, f"{name}.png")
                img_binary = io.BytesIO(artifact.binary)
                img = Image.open(img_binary)
                img.save(image_path)
                print("hii")
                return image_path


# Convert the generated images to a PDF file using the ConvertAPI

def convert_images_to_pdf(images):

    convertapi.api_secret = os.environ['CONVERT_API_KEY']
    convertapi.convert('pdf', {
        'Files': images
    }, from_format='images').file.save('./file.pdf')


# Add line breaks to the generated speech to make it easier to read in the comic

def add_line_breaks(text):

    # Split the text into a list of words

    words = text.split()
    new_text = ''
    for i, word in enumerate(words):
        new_text += word
        if (i+1) % 7 == 0:
            new_text += '\n'
        else:
            new_text += ' '
    return new_text


# Add text to the generated image using OpenCV and PIL

def add_text_to_image(image_path, text_from_prompt, file_number):

    # input should be an image and corresponding text needs to be added after padding

    #text= text

    # can probably ask for colour of padding, colour of font for each.

    image = Image.open(image_path)
    right_pad = 0
    left_pad = 0
    top_pad = 50
    bottom_pad = 0
    width, height = image.size
    new_width = width + right_pad + left_pad
    new_height = height + top_pad + bottom_pad
    result = Image.new(image.mode, (new_width, new_height), (255, 255, 255))
    result.paste(image, (left_pad, top_pad))
    font_type = ImageFont.truetype("font/mangat.ttf", 12)

    draw = ImageDraw.Draw(result)
    draw.text((10, 0), text_from_prompt, fill='black', font=font_type)
    result.save(f"./images/{file_number}.png")
    border_img = cv2.imread(f"./images/{file_number}.png")
    borderoutput = cv2.copyMakeBorder(
        border_img, 10, 10, 10, 10, cv2.BORDER_CONSTANT, value=[0, 0, 0])
    cv2.imwrite(f"./images/{file_number}.png", borderoutput)
