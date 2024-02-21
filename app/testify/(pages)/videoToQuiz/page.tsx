'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/videoToQuiz.css";

export default function VideoToQuiz() {
  const [formData, setFormData] = useState({
    videoLink: "",
    difficulty: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { videoLink, difficulty } = formData;
    const formDataToSend = {
      videoLink,
      difficulty,
    };

    try {
      const url = `http://localhost:3001/api/createQuizFromVideo`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });
      if (response.ok) {
        const responseData = await response.json();
        const quizId = responseData.quizId;
        localStorage.setItem('quizId', quizId);
        router.push(`/testify/quizHome?quizId=${quizId}`);
      } else {
        console.error("Error fetching API:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <form className={styles.hero_section} onSubmit={handleSubmit}>
          <h2>Video to QUIZ</h2>
		  <textarea
    name="videoLink"
    placeholder="Enter YouTube Link Here"
    id="videoLink"
    cols="30"
    rows="1"
    resize="no"
    required
    onChange={handleChange}
    style={{
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '1rem',
        fontSize: '1.5rem',
        fontFamily: 'Poppins, sans-serif',
        resize: 'none',
        outline: 'none',
        height: 'auto', // Set the height of the textarea to auto
        marginTop: '0.5rem', // Add some top margin
    }}
></textarea>

<span className="difficulty_label" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Set difficulty</span>
          <span className="difficulty">
            <input
              type="radio"
              name="difficulty"
              id="easy"
              value="1"
              required
            />
            <label htmlFor="easy">Easy</label>
            <input
              type="radio"
              name="difficulty"
              id="medium"
              value="2"
              required
            />
            <label htmlFor="medium">Medium</label>
            <input
              type="radio"
              name="difficulty"
              id="hard"
              value="3"
              required
            />
            <label htmlFor="hard">Hard</label>
          </span>
          <button type="submit" className="submit_button">Generate</button>
        </form>
      </div>
    </div>
  );
}
