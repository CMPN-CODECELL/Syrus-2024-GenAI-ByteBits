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
  console.log("Functions");
});
router.post("/createQuizFromVideo", async (req, res) => {
  try {
    console.log("Heyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    const response = await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      body: JSON.stringify({ videoLink: req.body.videoLink }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data) {
      const content = data.transcriptData;
      const difficulty = req.body.difficulty;
      const promptType = req.body.promptType;
      const quiz = await run(content, difficulty, promptType);
      console.log("quiz:", quiz);
      const quizId = uuidv4();
      quiz.quizId = quizId;
      const newQuiz = new Quiz(quiz);
      await newQuiz.save();
	console.log(quizId)
	  return res.status(200).json({ quizId: quizId });
      //   res.redirect(
      //     url.format({
      //       pathname: "/quizHome",
      //       query: {
      //         id: quizId,
      //       },
      //     })
      //   );
    //   return res.status(200).json({ quiz: quiz });
    }
  } catch (error) {
    console.error(error);
  }
});

//////////////////////////////////////////////// Post Route to Join quiz /////////////////////////////////////////////////
router.post("/joinQuiz", async (req, res) => {
	const quizId = req.body.quizId;
	answer = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
	res.redirect(
	  url.format({
		pathname: "/quiz",
		query: {
		  id: quizId,
		  no: 1,
		},
	  })
	);
  });

//////////////////////////////////////////////// Get Route to Quiz Platform /////////////////////////////////////////////////
router.get("/quiz", async (req, res) => {
	if (req.query.no > 0 && req.query.no < 11) {
	  const quiz = await Quiz.findOne({ quizId: req.query.id });
	  const ques = quiz.questions[req.query.no - 1];
	  res.json({question: ques.question,
		options: ques.options,
		no: parseFloat(req.query.no),
		id: req.query.id,
		answer: answer,})

	//   res.render("quiz_platform", {
	// 	question: ques.question,
	// 	options: ques.options,
	// 	no: parseFloat(req.query.no),
	// 	id: req.query.id,
	// 	answer: answer,
	//   });
	} else {
	  res.json({ message: "Invalid question number" }).status(404);
	}
  });

module.exports = router; //exporting router
