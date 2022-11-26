import Joi = require('joi');

export const createUserSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
      )
    )
    .messages({
      'string.empty': 'Senha não pode ser vazia!',
      'any.required': 'Campo password é necessário.',
      'string.pattern.base':
        'Senha deve conter ao menos 8 caracteres, uma letra maíuscula, 1 caracter especial e 1 número!',
    }),
});
