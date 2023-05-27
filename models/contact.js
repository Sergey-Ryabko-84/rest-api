const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../utils");

const emailRegexp = /^\S+@\S+\.\S+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      match: emailRegexp,
    },
    phone: {
      type: String,
      minlength: 5,
    },
    avatarURL: {
      type: String,
      default: "",
    },
    birth: {
      type: Date,
    },
    address: {
      type: String,
    },
    status: {
      type: [String],
      default: [],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

// **************** joi validation schemes **************** //

const addSchena = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp),
  phone: Joi.string().min(5),
  avatarURL: Joi.string(),
  birth: Joi.date().less("now"),
  address: Joi.string(),
  status: Joi.array().items(Joi.string()),
  favorite: Joi.boolean(),
});

const updateSchena = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp),
  phone: Joi.string().min(5),
  avatarURL: Joi.string(),
  birth: Joi.date().less("now"),
  address: Joi.string(),
  status: Joi.array().items(Joi.string()),
  favorite: Joi.boolean(),
});

const schemas = { addSchena, updateSchena };

module.exports = { Contact, schemas };