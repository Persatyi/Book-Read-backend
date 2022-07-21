const { Schema, model } = require("mongoose");
const Joi = require("joi");

const resultSchema = Schema({
  date: {
    type: Date,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
});

const Result = model("result", resultSchema);

const addResult = Joi.object({
  date: Joi.date().required(),
  pages: Joi.number().required(),
});

const schemas = {
  add: addResult,
};

module.exports = { Result, schemas };
