from flask import Flask, request, jsonify, send_file
from flask_cors import CORS,cross_origin
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from comicify_helpers import *
import openai
import os
import base64
from dotenv import load_dotenv
import PyPDF2
from youtube_transcript_api import YouTubeTranscriptApi



load_dotenv()

os.environ['STABILITY_HOST'] = 'grpc.stability.ai:443'
os.environ['STABILITY_KEY'] = os.getenv('STABLE_DIFFUSION_API')
os.environ['OPENAI_API'] = os.getenv('OPEN_AI_API')
os.environ['CONVERT_API_KEY'] = os.getenv('CONVERT_API')

stability_api = client.StabilityInference(
    key=os.environ['STABILITY_KEY'],
    verbose=True,
    engine="stable-diffusion-xl-beta-v2-2-2",
)


app = Flask(__name__)
client=openai.OpenAI(api_key=os.environ['OPENAI_API'])

CORS(app, resources={r'/*': {'origins': '*'}})

def convert_text_to_conversation(text):

    openai.api_key = os.environ['OPENAI_API']

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{
            "role": "system",
            "content": "You are a fun yet knowledgable assistant."
        }, {
            "role": "user",
            "content": text
        }],
        temperature=0.6,
        max_tokens=150)
    speech, person = generate_map_from_text(response.choices[0].message.content)
    return (speech, person)

@app.route('/', methods=['GET'])
def test():
    return 'The server is running!'

@app.route('/comicify', methods=['POST'])
def generate_comic_from_text():

    prompt = "Convert the following boring text into a comic style conversation between characters while retaining information. Try to keep the characters as people from the story. Keep a line break after each dialogue and don't include words like Scene 1, narration context and scenes etc. Keep the name of the character and not character number: \n\n\n"
    user_input = request.get_json()['userInput']
    customisation = request.get_json()['customizations']
    cfg = request.get_json()['cfgValue']
    step = request.get_json()['steps']
    print(user_input)
    print(customisation)
    input = prompt + user_input
    response = convert_text_to_conversation(input)
    print(response)

    generated_images_paths = []

    for i in range(len(response[0])):

        image_path = stable_diff(stability_api,
            response[1][i], response[0][i], i, customisation, cfg, step)
        print(image_path)
        generated_images_paths.append(image_path)

        text = add_line_breaks(response[0][i])

        add_text_to_image(f"./images/{i}.png", text, i)
        print(generated_images_paths)

    convert_images_to_pdf(generated_images_paths)

    return send_file('./file.pdf', as_attachment=True)


template = """You are a online teacher assistant who teaches for class 6-8 students aged 10-16 .You are multilingual. You need to provide answers which are 
understandable to students aged 10-16.You Need to give answers only in 10 lines approximately 10-20 words only.You have to answer to this Question: {question}.The answer must follow a certain format explaining them the concept very easily.
"""

prompt = PromptTemplate.from_template(template)
prompt = PromptTemplate(input_variables=["question"],
                            template=template)
llm = ChatOpenAI(model="gpt-4",temperature=0.0,openai_api_key=os.environ['OPENAI_API'])
llm_chain = LLMChain(prompt=prompt, llm=llm)

def genImage(input):
    response= client.images.generate(
        model="dall-e-3",
        prompt=input,
        size="1024x1024",
        quality="hd",
        n=1
    )
    url=response.data[0].url
    return url


# Initialize memory for storing previous response
memory = ""
@app.route('/', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def home():
    global memory

    if(request.method == 'POST'):
        try:
            input_text = request.json.get('input')  # Use .get() to avoid KeyError
            if input_text is None:
                raise ValueError("Input text not found in request JSON")
            question = input_text
             # Use previous response as context if available
            context = memory if memory else None
            response = llm_chain.run(question)
            # image_response = genImage(response)
            # url="https://" + image_response.split("https://")[1].replace(")","")
            # print(url)
            memory = response
            # print(jsonify({'text':response,'url':url}))
            return jsonify({'text':response})
            # return jsonify({'text':response,'url':url})
        except KeyError:
             return 'Missing "input" field in JSON data', 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    return "hello"

def extract_text_from_pdf(pdf_file):
    text = ''
    reader = PyPDF2.PdfReader(pdf_file)
    num_pages = len(reader.pages)
    for page_num in range(num_pages):
        page = reader.pages[page_num]
        text += page.extract_text()
    return text

@app.route('/parse-pdf', methods=['POST'])
def parse_pdf():
    print("Heyyyy")
    if 'file' not in request.files:
        print("File not found")
        return jsonify({'error': 'No file part'}), 400
    
    pdf_file = request.files['file']
    if pdf_file.filename == '':
        print("File not selected")
        return jsonify({'error': 'No selected file'}), 400
    
    if pdf_file and pdf_file.filename.endswith('.pdf'):
        try:
            extracted_text = extract_text_from_pdf(pdf_file)
            print("extracted: ", extracted_text)
            return jsonify({'text': extracted_text}), 200
        except Exception as e:
            print("error: ", str(e))
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Invalid file format. Please upload a PDF file'}), 400
    
@app.route('/video', methods=['POST'])
def index():
    data = request.json
    youtube_video = data.get('videoLink')
    print("Received video link:", youtube_video)

    # Extracting video ID from the YouTube URL
    video_id = youtube_video.split("=")[1]
    
    # Fetching and processing the transcript
    # Assuming get_processed_transcript(video_id) is defined elsewhere
    transcript_data = get_processed_transcript(video_id)

    # Generating the YouTube embed code
    youtube_embed_code = f'<iframe width="560" height="315" src="https://www.youtube.com/embed/{video_id}" frameborder="0" allowfullscreen></iframe>'
    
    # Return both transcript data and YouTube embed code
    return jsonify({"transcriptData": transcript_data, "youtubeEmbedCode": youtube_embed_code})


def get_processed_transcript(video_id):
    languages_to_try = ['en-IN', 'hi', 'bn-IN']  # List of languages to try fetching the transcript in
    for lang in languages_to_try:
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=[lang])
            result = ""
            for i in transcript:
                result += ' ' + i['text']
            return result
        except Exception as e:
            print(f"Attempted {lang}, but got error: {e}")
    return "Transcript could not be fetched in the attempted languages."

@app.route('/greetings',methods =['GET'])
@cross_origin(supports_credentials=True)
def greetings():
    return "Hello , how can I help you today!"

if __name__ == '__main__':
    app.run(debug=True)
