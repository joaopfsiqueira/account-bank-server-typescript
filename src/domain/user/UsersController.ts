/**
 * Criando controler, vai utilizar o repository do typeorm na sua ÚLTIMA VERSÃO! Poderia ser apenas o entity manager, mas por questão de entendimento de código, optei por usar o repository.
 */

import { Request, Response } from 'express';
import { userSchema } from '../../utils/validator/usersSchema';
import { UserService } from './UserService';

export default class UsersControllers {
  public async validateParamsUser(req: Request, res: Response, next) {
    try {
      const validation = userSchema.validate(req.body);
      if (validation.error) {
        if (validation.error.details[0].type === 'string.pattern.base') {
          return res.status(400).send({
            Message:
              'Senha deve conter ao menos 8 caracteres, uma letra maíuscula, 1 caracter especial e 1 número!',
          });
        }
        return res.status(400).send({
          Message: validation.error.message,
        });
      }

      next();
    } catch (error) {
      return res
        .status(400)
        .json('Ocorreu um erro ao tentar validar os dados!');
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body; // associação por desestruturação.

    const userService = new UserService();
    if (await userService.findByUsername(username))
      return res.status(400).send({
        Message: 'Username já cadastrado!',
      });

    const newUser = await userService.createUser(username, password);

    return res.send(newUser);
  }
}