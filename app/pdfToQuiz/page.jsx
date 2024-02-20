"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/pdfToQuiz.css";
import { useRouter } from "next/navigation";

const PdfToQuizPage = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [difficulty, setDifficulty] = useState("1"); // Default difficulty level is "1" (easy)
  const [promptType, setPromptType] = useState("0");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // First, make a request to the parse-pdf endpoint
      const parsePdfResponse = await fetch("http://127.0.0.1:5000/parse-pdf", {
        method: "POST",
        body: formData,
      });

      // Check if the response from parse-pdf is successful
      if (parsePdfResponse.ok) {
        // Extract the text from the response
        const parsePdfData = await parsePdfResponse.json();
        const extractedText = parsePdfData.text;

        // Now, make a request to the createQuiz endpoint with the extracted text
        const createQuizResponse = await fetch(
          "http://localhost:3001/api/createQuiz",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quizContent: extractedText,
              difficulty: difficulty,
              promptType: promptType,
              // Add other required parameters like difficulty and promptType here
            }),
          }
        );

        // Check if the response from createQuiz is successful
        if (createQuizResponse.ok) {
          const responseData = await createQuizResponse.json(); // Extract JSON body from response
          const quizId = responseData.quizId; // Access quizId property from JSON
          console.log("quizId: ", quizId);
          localStorage.setItem("quizId", quizId);
          router.push(`/quizHome?quizId=${quizId}`); // Pass quizId as query parameter
        } else {
          console.error("Error creating quiz:", createQuizResponse.statusText);
        }
      } else {
        console.error("Error parsing PDF:", parsePdfResponse.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }

    console.log("Form submitted!");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    pdfselected(file);
    setDisabled(false);
  };

  const pdfselected = (file) => {
    document.querySelector(".select_button").textContent = "PDF Selected";
    document.querySelector(".select_button").style.background = "Green";
    document.querySelector(".select_button_para").textContent = file.name;
  };

  useEffect(() => {
    const submitButton = document.getElementById("submit_button");
    submitButton.addEventListener("click", handleSubmit);
    return () => {
      submitButton.removeEventListener("click", handleSubmit);
    };
  }, [handleSubmit]);

  return (
    <div
      className={`${styles.loader} ${styles.loader_active}`}
      onDrop={handleFileChange}
    >
      <dialog className={styles.modal}>
        <p>Please wait! Your quiz is being generated</p>
      </dialog>

      <form
        className="hero_section"
        method="post"
        id="form"
        onSubmit={handleSubmit}
        action="/createQuiz"
      >
        <div className="selection_area">
          <div className="select_pdf">
            <input
              type="file"
              name="pdf"
              id="pdf"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
            <label htmlFor="pdf" className="select_button">
              Select PDF
            </label>
            <p className="select_button_para">or drag and drop pdf here</p>
            {selectedFile && <p>{selectedFile.name}</p>}
          </div>
          <div className="select_text">
            <textarea
              name="quizContent"
              id="text"
              rows="10"
              placeholder="Enter the text if you don't have pdf"
            ></textarea>
          </div>
        </div>

        <div className={`submit_area ${disabled ? "disabled" : ""}`}>
          <h2>PDF to QUIZ</h2>
          <div className="toggle">
            <label htmlFor="index_start" className="index_start">
              From Page
            </label>
            <input
              type="number"
              className="index_start"
              id="index_start"
              required
            />
            <label htmlFor="index_end" className="index_end">
              To Page
            </label>
            <input
              type="number"
              className="index_end"
              id="index_end"
              required
            />
            <span className="difficulty_label">Set difficulty</span>
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
          </div>
          <button
            type="submit"
            id="submit_button"
            className={`submit_button ${disabled ? "disabled" : ""}`}
            name="promptType"
            value="0"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default PdfToQuizPage;
