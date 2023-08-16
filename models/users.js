// const {Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");
const Joi = require("joi");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
}, {versionKey: false}
)

userSchema.methods.setPassword = function(password) {
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function(password) {
    return bCrypt.compareSync(password, this.password);
}

const joiSignupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required()
})

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required()
})

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
  joiLoginSchema,
  joiSignupSchema
}
