// Import
const { Schema, model } = require("mongoose");
const Joi = require("joi");

// Array schema
const status = ["goingToRead", "reading", "read"];
const rating = [0, 1, 2, 3, 4, 5];
// Mongoose schema
const bookSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: status,
      default: "goingToRead",
    },
    rating: {
      type: Number,
      enum: rating,
      default: 0,
    },
    resume: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);
// Joi schema
const addBook = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().required(),
  pages: Joi.number().required(),
  status: Joi.string().valid(...status),
  rating: Joi.number().valid(...rating),
  resume: Joi.string(),
});
const reviewBook = Joi.object({
  rating: Joi.number().valid(...rating),
  resume: Joi.string(),
});
const schemas = { addBook, reviewBook };

const Book = model("book", bookSchema);

module.exports = {
  Book,
  schemas,
};
