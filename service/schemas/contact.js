const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

// Joi
const validationContact = Joi.object({
    name: Joi.string()
      .min(2)
      .max(35)
      .pattern(/^[A-Za-z ]+$/)
      .messages({
        "string.pattern.base":
        "Invalid name. The name must be written only in letters"
      }),
    email: Joi.string()
      .email({ minDomainSegments: 2})
      .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .messages({
        "string.pattern.base":"Invalid email"
      }),
    phone: Joi.string()
      .min(7)
      .max(30)
      .pattern( /^(?:\+?\d{1,2}\s)?[\d\s()\-\+]+$/)
      .messages({
        "string.pattern.base":"Invalid phone"
      }),
      favorite: Joi.boolean()
})

// Mongoose Schema

const contact = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 35,
    match: /^[A-Za-z ]+$/,
    unique: true,
    require: [true, "Name is required"],
  },
  email: {
    type: String,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    unique: true,
    require: [true, "Email is required"],
  },
  phone: {
    type: String,
    match: /^(?:\+?\d{1,2}\s)?[\d\s()\-\+]+$/,
    unique: true,
    require: [true, "Phone is required"],
  },
  favorite: {
    type: Boolean,
    default: false,
    require: [true]
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
  },
  {versionKey: false}
)

const Contact = mongoose.model("contact", contact);
module.exports = { validationContact, Contact };