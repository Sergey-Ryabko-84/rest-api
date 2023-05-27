const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../utils");

const emailRegexp =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

// **************** User model **************** //

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      require: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      minlength: 6,
      require: true,
    },
    avatarURL: {
      type: String,
      default: "",
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

// **************** joi validation schemes **************** //

const signupSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().pattern(emailRegexp),
});

const schemas = { signupSchema, signinSchema, refreshSchema, updateSchema };

module.exports = { User, schemas };
