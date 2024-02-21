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
            router.push(`/testify/quiz/${quizId}`);
        } catch (error) {
            console.error("Error navigating to quiz:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Tada the quiz is ready</h1>
                <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={handleStartQuiz}
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
}

export default QuizHomePage;
