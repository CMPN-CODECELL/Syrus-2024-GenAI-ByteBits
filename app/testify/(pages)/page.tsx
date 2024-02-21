'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
// import LottieAnimation from './LottieAnimation'; // Import the LottieAnimation component

const Page = () => {
  const router = useRouter();

  const handlePdfOptionClick = () => {
    router.push('/testify/pdfToQuiz');
  };

  const handleVideoOptionClick = () => {
    router.push('/testify/videoToQuiz');
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      {/* Render the Lottie animation as a background */}
      {/* <div className="absolute inset-0 z-0 pointer-events-none">
        <LottieAnimation />
      </div> */}
      <div className="flex flex-col items-center z-10">
        <h1 className="text-3xl font-bold mb-8">Generate Quiz</h1>
        <div className="flex space-x-8">
          {/* PDF Option Box */}
          <div
            className="w-64 h-32 bg-blue-500 font-semibold flex justify-center items-center rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300"
            onClick={handlePdfOptionClick}
          >
            PDF
          </div>
          {/* Video Option Box */}
          <div
            className="w-64 h-32 bg-green-500 font-semibold flex justify-center items-center rounded-lg cursor-pointer hover:bg-green-600 transition duration-300"
            onClick={handleVideoOptionClick}
          >
            Video
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
