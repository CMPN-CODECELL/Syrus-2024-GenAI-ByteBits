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

router.post('/byId', async (req, res) => {
  const schema = joi.object({
    id: joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);
    const valuator = await Valuator.findById(data.id);
    return res.send(valuator);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/valuate', async (req, res) => {
  console.log('hello world');
  const schema = joi.object({
    valuatorId: joi.string().required(),
    answerSheet: joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);
    const valuator = await Valuator.findById(data.valuatorId);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'system',
          content: aiPrompt,
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Question Paper:' },
            {
              type: 'image_url',
              image_url: {
                url: valuator.questionPaper,
              },
            },
          ],
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Answer Keys:' },
            {
              type: 'image_url',
              image_url: {
                url: valuator.answerKey,
              },
            },
          ],
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Answer Sheet:' },
            {
              type: 'image_url',
              image_url: {
                url: data.answerSheet,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const resp = completion.choices[0].message.content;

    const respData = JSON.parse(resp.split('```json')[1].split('```')[0]);

    const newValuation = new Valuation({
      valuatorId: data.valuatorId,
      data: respData,
      answerSheet: data.answerSheet,
    });

    await newValuation.save();

    return res.send(respData);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

