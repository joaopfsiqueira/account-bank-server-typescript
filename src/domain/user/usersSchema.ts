import Joi = require('joi');

export const userSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
      )
    ),
});
