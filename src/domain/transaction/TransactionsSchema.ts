import Joi = require('joi');

export const TransactionSchema = Joi.object({
  value: Joi.number().required().messages({
    'number.empty': 'Valor não pode ser vazio!',
    'any.required': 'Campo valor necessário!',
  }),
  creditedUsername: Joi.string().required().min(3).messages({
    'string.empty':
      'Usuário que vai receber a transaferência não pode ser vazio!',
    'any.required': 'Campo creditedUsername necessário',
    'string.min': 'CreditedUsername deve ter ao menos 3 caracteres!',
  }),
});
