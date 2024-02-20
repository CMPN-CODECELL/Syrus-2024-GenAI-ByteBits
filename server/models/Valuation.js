const mongoose =   require('mongoose');

const ValuationSchema = new mongoose.Schema(
  {
    valuatorId: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    answerSheet: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Valuation = mongoose.model('Valuation', ValuationSchema);

module.exports =  Valuation;
