const Joi = require("joi");

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
      })
})

module.exports = { validationContact };