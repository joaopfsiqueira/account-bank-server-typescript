import Joi = require('joi');

export const TransactionSchema = Joi.object({
  value: Joi.number().required(),
  debitedAccount: Joi.number().required(),
  creditedUsername: Joi.string().required().min(3),
});

export const TransactionsUser = Joi.object({
  account: Joi.number().required(),
});
