from flask import Flask,  request, jsonify
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi
import PyPDF2


app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for your Flask app

@app.route('/', methods=['POST'])
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


if __name__ == '__main__':
    app.run(debug=True)
