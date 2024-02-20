// pages/quizHome.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function QuizHomePage() {
    const [quizId, setQuizId] = useState("");

    useEffect(() => {
        setQuizId(localStorage.getItem('quizId'));
    }, []);

    const router = useRouter();

    const handleStartQuiz = async () => {
        try {
            router.push(`/quiz/${quizId}`);
        } catch (error) {
            console.error("Error navigating to quiz:", error);
        }
    };

    return (
        <>
            <h1>Tada the quiz is ready</h1>
            <button onClick={handleStartQuiz}>Start Quiz</button>
        </>
    );
}

export default QuizHomePage;
