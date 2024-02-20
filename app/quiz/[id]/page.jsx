'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LottieAnimation from '../../LottieAnimation'; // Import the LottieAnimation component


const QuizPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [no, setNo] = useState(1);

  // State variables for modal
  const [name, setName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/quiz?id=${id}&no=${no}`);
        if (res.ok) {
          const data = await res.json();
          setQuestion(data.question);
          setOptions(data.options);
          // Clear selected option when fetching new question
          setSelectedOption(null);
        } else {
          console.error('Failed to fetch question');
        }
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    if (id && no) {
      fetchQuestion();
    }
  }, [id, no]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Selected option:', selectedOption);
    // Increment question number
    if (no !== 10) {
      setNo(no + 1);
    } else {
      // Show modal for submission
      setModalOpen(true);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCloseModal = () => {
    // Close modal and reset name input
    setModalOpen(false);
    setName('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Submit form logic here
    console.log('Submitting quiz with name:', name);
    
    try {
      const res = await fetch(`http://localhost:3001/api/ques?id=${id}&no=${no}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer: selectedOption, name })
      });
      
      if (res.ok) {
        const data = await res.json();
        const { score, resultId } = data;
        
        // Redirect to score page with quiz ID and result ID
        router.push(`/score/${id}/${resultId}/${score}`);
      } else {
        console.error('Failed to submit quiz');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
    
    // Close the modal
    handleCloseModal();
  };
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <div className="font-bold text-lg text-center">Question {no}</div>
          <div className="question_text text-center">{question}</div>
        </div>
		   {/* Render the Lottie animation as a background */}
		   <div className="absolute inset-0 z-0 pointer-events-none">
        <LottieAnimation />
      </div>
        <div className="option_container">
          {options.map((option, index) => (
            <div className="option" key={index}>
              <input 
                type="radio" 
                id={`option_${index + 1}`} 
                name="answer" 
                value={index} 
                checked={selectedOption === String(index)} 
                onChange={handleOptionChange} 
              />
              <label htmlFor={`option_${index + 1}`} className="option_text">{option}</label>
            </div>
          ))}
        </div>
        <div className="button_container mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit}>Next</button>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg">
              <p className="mb-4">Do you want to Submit the Quiz? <br />
              <sub>You would not be able to edit your response after submission</sub></p>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-bold">Your Name:</label>
                <input type="text" id="name" value={name} onChange={handleNameChange} className="w-full mt-1 p-2 border rounded-md" placeholder="Your Name" />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={handleCloseModal} className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Cancel</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
