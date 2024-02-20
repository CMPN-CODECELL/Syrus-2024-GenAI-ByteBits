from flask import Flask,  request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi

app = Flask(__name__)

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


if __name__ == '__main__':
    app.run(debug=True)
