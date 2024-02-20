const mongoose = require('mongoose');

const ValuatorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questionPaper: {
      type: String,
      required: true,
    },
    answerKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Valuator =new mongoose.model('Valuator', ValuatorSchema);

module.exports = Valuator