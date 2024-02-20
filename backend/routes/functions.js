const express = require("express"); //importing express
const mongoose = require("mongoose"); //importing mongoose
const run = require("./openAI"); //importing openAI.js
const router = express.Router(); //creating router
const { v4: uuidv4 } = require("uuid"); //importing uuid
const url = require("url"); //importing url

const Quiz = require("../models/questions.model"); //importing the model
const Result = require("../models/results.model"); //importing the model
let answer = []; //array to store score

//////////////////////////////////////////////// Post Route to create Quiz form Video/////////////////////////////////////////////////

router.get("/", async (req, res) => {
	console.log("Functions")
  });
router.post("/createQuizFromVideo", async (req, res) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      body: JSON.stringify({ videoLink: req.body.videoLink }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
	console.log(data)

    const content = data.transcriptData;
    const difficulty = req.body.difficulty;
    const promptType = req.body.promptType;
    const quiz = await run(content, difficulty, promptType);
    const quizId = uuidv4();
    quiz.quizId = quizId;
    const newQuiz = new Quiz(quiz);
    try {
      await newQuiz.save();
    //   res.redirect(
    //     url.format({
    //       pathname: "/quizHome",
    //       query: {
    //         id: quizId,
    //       },
    //     })
    //   );
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router; //exporting router
