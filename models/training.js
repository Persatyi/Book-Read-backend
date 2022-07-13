const mongoose = require("mongoose");
const Joi = require("joi");

const trainingSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
    min: this.start,
  },
  books: {
    type: [mongoose.Types.ObjectId],
    ref: "book",
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  results: {
    type: [mongoose.Types.ObjectId],
    ref: "result",
    default: [],
  },
});

const Training = mongoose.model("training", trainingSchema);

const addTraining = Joi.object({
  start: Joi.date().required(),
  end: Joi.date().required().min(Joi.ref("start")),
  books: Joi.array().items(Joi.string()),
});

const schemas = {
  add: addTraining,
};

module.exports = { Training, schemas };
