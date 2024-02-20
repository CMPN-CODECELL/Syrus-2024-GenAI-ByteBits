"use client"

import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import React, {useState,useEffect} from 'react'
import { Rings } from 'react-loader-spinner'

const HomePage = () => {

  const [volume, setVolume] = useState(0.8);
  const [mirrored, setmirrored] = useState(true);
  const [loading, setLoading] = useState(false)

  // useEffect(()=>{
  //   setLoading(true);
  // })
  return (
    
    <div className="flex h-screen max-lg:flex-col max-md:flex-col">
      {/* Left divison - webcam and canvas */}
      <div className='h-[100%] w-[50%]'>
         <div className="w-full h-[50%] rounded-lg shadow-lg">
            <div className="flex justify-center items-center">
              <div className="w-40 h-40 bg-gray-300 rounded-full"></div>
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
      <div className="">
        Hello
      </div>
    </>
    )
  }

}

export default HomePage