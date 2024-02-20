const express = require('express');
const joi  = require('joi');
const Valuator = require('../models/Valuator.js');
const OpenAI = require('openai');
const aiPrompt = require('../utils/utils.js');
const Valuation = require('../models/Valuation.js');

const router = express.Router();

router.get('/', async (req, res) => {
  var valuators = await Valuator.find().lean();

  for (const valuator of valuators) {
    valuator.valuations = await Valuation.find({
      valuatorId: valuator._id,
    }).countDocuments();
  }

  res.send(valuators.reverse());
});

router.post('/', async (req, res) => {
  const schema = joi.object({
    title: joi.string().required(),
    questionPaper: joi.string().required(),
    answerKey: joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);
    const newValuator = new Valuator({
      title: data.title,
      questionPaper: data.questionPaper,
      answerKey: data.answerKey,
    });

    return res.send(await newValuator.save());
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});
