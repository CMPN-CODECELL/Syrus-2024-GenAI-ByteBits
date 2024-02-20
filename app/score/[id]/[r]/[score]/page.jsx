'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const ScorePage = () => {
  const router = useRouter();
  const params = useParams();
  const { id, r, score } = params;
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-center">Quiz Score</div>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">Quiz ID:</span> {id}
          </p>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">Score:</span> {score}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-center">
          <button onClick={() => router.push('/')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScorePage;
