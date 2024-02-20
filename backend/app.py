from flask import Flask, request, jsonify
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from flask_cors import CORS,cross_origin
from openai import OpenAI
import os
from dotenv import load_dotenv



load_dotenv('.env')
API_KEY = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app,origins='http://127.0.0.1:3000')

client=OpenAI(api_key= API_KEY)
template = """You are a online teacher assistant who teaches for class 6-8 students aged 10-16 .You are multilingual. You need to provide answers which are 
understandable to students aged 10-16.You Need to give answers only in 10 lines approximately 10-20 words only.You have to answer to this Question: {question}.The answer must follow a certain format explaining them the concept very easily.
"""

prompt = PromptTemplate.from_template(template)
prompt = PromptTemplate(input_variables=["question"],
                            template=template)


llm = ChatOpenAI(model="gpt-4",temperature=0.0,openai_api_key=API_KEY)
llm_chain = LLMChain(prompt=prompt, llm=llm)
def genImage(input):
    response=client.images.generate(
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

@app.route('/greetings',methods =['GET'])
@cross_origin(supports_credentials=True)
def greetings():
    return "Hello , how can I help you today!"

if __name__ == '__main__':
    app.run(debug=True)
