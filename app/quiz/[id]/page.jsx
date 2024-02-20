// // pages/quiz/[id].js
// 'use client';
// import { useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// const QuizPage = () => {
//   const router = useRouter();
//   const params = useParams();
//   const id= params.id;
  

//   const [question, setQuestion] = useState('');
//   const [options, setOptions] = useState([]);
//   const [answer, setAnswer] = useState([]);
//   const [no, setNo]=useState(1);

//   useEffect(() => {
//     const fetchQuestion = async () => {
//       try {
//         const res = await fetch(`/api/quiz?id=${id}&no=${no}`);
//         if (res.ok) {
//           const data = await res.json();
//           setQuestion(data.question);
//           setOptions(data.options);
//           setAnswer(data.answer);
//         } else {
//           console.error('Failed to fetch question');
//         }
//       } catch (error) {
//         console.error('Error fetching question:', error);
//       }
//     };

//     if (id && no) {
//       fetchQuestion();
//     }
//   }, [id, no]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//     console.log('Submitting answer');
//   };

//   return (
//     <div className="container">
//       <div className="question_container">
//         <div className="question">
//           <div className="heading">Question {no}</div>
//           <div className="question_text">{question}</div>
//         </div>
//         <div className="option_container">
//           {options.map((option, index) => (
//             <div className="option" key={index}>
//               <input type="radio" name="answer" id={`option_${index + 1}`} value={index} />
//               <label htmlFor={`option_${index + 1}`} className="option_text">{option}</label>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="button_container">
//         <button className="button next" type="submit" onClick={handleSubmit}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default QuizPage;

// pages/quiz/[id].js
'use client';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const QuizPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [no, setNo] = useState(1);

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
    setNo(no + 1);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="container">
      <div className="question_container">
        <div className="question">
          <div className="heading">Question {no}</div>
          <div className="question_text">{question}</div>
        </div>
        <div className="option_container">
          {options.map((option, index) => (
            <div className="option" key={index}>
              <input 
                type="radio" 
                id={`option_${index + 1}`} 
                name="option" 
                value={index} 
                checked={selectedOption === String(index)} 
                onChange={handleOptionChange} 
              />
              <label htmlFor={`option_${index + 1}`} className="option_text">{option}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="button_container">
        <button className="button next" type="submit" onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
};

export default QuizPage;

