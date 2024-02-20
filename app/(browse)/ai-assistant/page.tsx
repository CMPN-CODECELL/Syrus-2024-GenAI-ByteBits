"use client"

import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Camera, FlipHorizontal, LogOut, MoonIcon, PersonStanding, SunIcon, Video, Volume2 } from 'lucide-react'
import { MicOff } from 'lucide-react';
import { Mic } from 'lucide-react';
import React, {useState,useEffect} from 'react'
import { Rings } from 'react-loader-spinner'
import axios from 'axios'; 
import "regenerator-runtime";
import speech,{useSpeechRecognition} from "react-speech-recognition"

const HomePage = () => {

  const [mute, setMute] = useState(false);
  const [mirrored, setmirrored] = useState(true);
  const [loading, setLoading] = useState(false)


  const toggleMute = () => {
    setMute(prevState => !prevState);
    if (!mute) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const audioTracks = stream.getAudioTracks();
          audioTracks.forEach(track => {
            track.enabled = false;
          });
        })
        .catch(error => {
          console.error('Error accessing microphone:', error);
        });
    } else {
      console.log("muted")
    }
  };

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
    <div className="flex h-screen max-lg:flex-col max-md:flex-col">
      {/* Left divison - webcam and canvas */}
      <div className='h-[100%] w-[50%] flex justify-center items-center'>
        <div className="w-full h-full rounded-lg shadow-lg flex flex-col gap-6 justify-center items-center">
          <div className="w-40 h-40 bg-gray-300 rounded-full"></div>
          <div className="text-2xl">Teacher Name : Aum Kulkarni</div>
          <div className="flex gap-8 ">
            <Button
              onClick={toggleMute}
              className="my-2 h-6 w-6"
              variant={"outline"} 
              size={"icon"}
              asChild
            >
              {mute? <MicOff size={14} />:<Mic color="#ff0000" size={14}/>}
            </Button>
            <Button
              onClick={null}
              className="my-2 h-6 w-6"
              variant={"outline"} 
              size={"icon"}
              asChild
            >
              <LogOut color="#ff0000" size={14}/>
            </Button>
            <Button className="my-2 h-6 w-6"
              variant={"outline"} 
              size={"icon"} 
              onClick={() => {
                speech.startListening();
            }}>
              Speak
            </Button>
            <Button className="my-2 h-6 w-6"
              variant={"outline"} 
              size={"icon"}
              onClick={() => {
              speech.stopListening();
            }}>Stop
            </Button>
            <Button className="my-2 h-6 w-6"
              variant={"outline"} 
              size={"icon"} 
              onClick={() => {
              speechSynthesis.cancel();
            }}>Stop answer
            </Button>
          </div>
        </div>
      </div>
      
      {/* Right divsion - container for button panel and wiki section */}
      <div className="flex flex-row flex-1">
        <div className="border-primary/5 border-2 max-w-xs flex flex-col gap-2 justify-between shadow-md rounded-md p-4">
          {/* Top section */}
          <div className="flex flex-col gap-2">
            <ModeToggle/>
            <Separator className='my-2'/>
          </div>

          {/* Middle section */}
          <div className="flex flex-col gap-2">
            <Separator className='my-2'/>
          
        
            <Separator className='my-2'/>
          </div>

          {/* Bottom section */}

          <div className="flex flex-col gap-2 justify-center items-center">
            <Separator className='my-2'/>

          </div>
        </div>
        <div className="h-full flex-1 py-4 px-2 overflow-y-scroll">
          <RenderFeatureHighlightSection/>
        </div>
      </div>
      {loading && (
        <div className="z-50 absolute w-full h-full flex items-center justify-center bg-primary-foreground">
          Getting things ready . . . <Rings height={50} color='red'/>
        </div>
      )}
    </div>
  )

  function RenderFeatureHighlightSection(){
    return (
    <>
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
        {imageURL && (
            <div>
              <img src={imageURL} alt="image" className="w-[50%] h-[50%]" />
            </div>
        )}
    </>
    )
  }

}

export default HomePage