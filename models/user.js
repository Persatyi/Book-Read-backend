const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const passwordRegexp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,16}/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      minLength: 10,
      maxLength: 63,
      match: emailRegexp,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: 1,
      maxLength: 30,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerUser = Joi.object({
  email: Joi.string().min(10).max(63).pattern(emailRegexp).required(),
  password: Joi.string().min(6).max(16).pattern(passwordRegexp).required(),
  name: Joi.string().min(1).max(30).required(),
});
const loginUser = Joi.object({
  email: Joi.string().min(10).max(63).pattern(emailRegexp).required(),
  password: Joi.string().min(6).max(16).pattern(passwordRegexp).required(),
});

const schemas = {
  registerUser,
  loginUser,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
