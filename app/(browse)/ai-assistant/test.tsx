"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import "regenerator-runtime";
import speech,{useSpeechRecognition} from "react-speech-recognition"

const VoiceAssistant: React.FC = () => {
  const [voiceOutput, setVoiceOutput] = useState<string[]>([]);
  const { listening, transcript } = useSpeechRecognition();
  const [voiceInput, setVoiceInput] = useState<string[]>([]);
  const [voices, setVoices] = useState<string>('');
  const [imageURL, setImageURL] = useState<string | undefined>();

  const sendVoiceInputToBackend = async (input: string) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/', { input }, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
      console.log('Backend Response:', response.data);
      if (response?.data) {
        setVoiceOutput(prevOutput => [...prevOutput, response.data.text]);
        if (response?.data?.url) {
          setImageURL(response.data.url);
        }
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(response.data.text);
        // utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google हिन्दी');
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error sending voice input to backend:', error);
    }
  };

  useEffect(() => {
    if (!listening && transcript) {
      setVoiceInput(prevInput => [...prevInput, transcript]);
      sendVoiceInputToBackend(transcript);
    }
  }, [listening, transcript]);

  return (
    <>
      <div className="bg-gray-800 text-white py-2 text-center">
        <p>Virtual Teacher Assistant</p>
      </div>
      <div className="flex flex-col h-screen justify-between">
        <div className="flex justify-center items-center h-full bg-gray-900 text-white">
          <div className="w-3/4 sm:w-1/2 lg:w-1/3 xl:w-1/4 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Virtual Classroom</h2>
            <div className="flex justify-center items-center mb-4">
              <div className="w-40 h-40 bg-gray-300 rounded-full"></div>
            </div>
            <div className='flex justify-start gap-2 items-center'>
              <button className="bg-blue-700 p-2 m-2" onClick={() => {
                speech.startListening();
              }}>Speak</button>
              <button className="bg-blue-700 p-2 m-2" onClick={() => {
                speech.stopListening();
              }}>Stop</button>
              <button className="bg-blue-700 p-2 m-2" onClick={() => {
                speechSynthesis.cancel();
              }}>Stop answer</button>
            </div>
            {
              listening ? <p className='text-black'>Go Ahead i am listening</p> : <p className='text-black'>Click the button and ask me anything</p>
            }
        </div>
          {imageURL && (
            <div>
              <img src={imageURL} alt="image" className="w-[50%] h-[50%]" />
            </div>
          )}
        </div>
        {
          voiceInput?.map((question, index) => (
            <div key={index}>
              <p><span>Student:</span> {question}</p>
            </div>
          ))
        }
        {
          voiceOutput?.map((answer, index) => (
            <div key={index}>
              <p><span>Teacher:</span> {answer}</p>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default VoiceAssistant;






