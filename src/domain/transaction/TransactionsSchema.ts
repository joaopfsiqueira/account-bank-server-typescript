import Joi = require('joi');

export const userSchema = Joi.object({
  value: Joi.number().required(),
  debitedAccount: Joi.number().required(),
  creditedUsername: Joi.string().required().min(3),
});
