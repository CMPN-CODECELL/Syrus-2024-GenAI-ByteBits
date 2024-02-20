"use client";
import styles from "../styles/videoToQuiz.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      console.log(videoLink);
      const url = `http://localhost:3001/api/createQuizFromVideo`;
      console.log("url: ", url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });
      if (response.ok) {
        const responseData = await response.json(); // Extract JSON body from response
        const quizId = responseData.quizId; // Access quizId property from JSON
        console.log("quizId: ", quizId);
        localStorage.setItem('quizId', quizId);
        router.push(`/quizHome?quizId=${quizId}`); // Pass quizId as query parameter
      } else {
        console.error("Error fetching API:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching API:", error);
    }
};

  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <dialog className={styles.modal}>
          <p>Please wait! Your Quiz is being generated</p>
        </dialog>
        <form className={styles.hero_section}>
          <h2>Video to QUIZ </h2>
          <div className={styles.input_area}>
            <h3>Enter the Youtube Link here !</h3>
            <textarea
              name="videoLink"
              id="videoLink"
              cols="30"
              rows="1"
              resize="no"
              required
              onChange={handleChange}
            ></textarea>
          </div>
          <div className={styles.difficulty}>
            <h3>Set difficulty !</h3>
            <div>
              <input
                type="radio"
                name="difficulty"
                id="difficulty"
                value="1"
                onChange={handleChange}
              />
              <label htmlFor="easy">Easy</label>
              <input
                type="radio"
                name="difficulty"
                id="difficulty"
                value="2"
                onChange={handleChange}
              />
              <label htmlFor="medium">Medium</label>
              <input
                type="radio"
                name="difficulty"
                id="difficulty"
                value="3"
                onChange={handleChange}
              />
              <label htmlFor="hard">Hard</label>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            name="promptType"
            value="1"
          >
            Generate
          </button>
        </form>
      </div>
    </div>
  );
}
