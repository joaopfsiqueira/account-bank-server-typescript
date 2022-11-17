import Joi = require('joi');

export const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
      )
    ),
});
