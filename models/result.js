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

const addResult = Joi.object({
  date: Joi.date().required(),
  pages: Joi.number().required(),
});
