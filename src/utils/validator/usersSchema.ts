import { joi } from '@hapi/joi';

export const userSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});
