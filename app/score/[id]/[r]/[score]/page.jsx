'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ScorePage = () => {
  const router = useRouter();
  const params = useParams();
  const { id, r, score } = params;

  return (
    <div className="container">
      <h1>Quiz Score</h1>
      <p>Quiz ID: {id}</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default ScorePage;
