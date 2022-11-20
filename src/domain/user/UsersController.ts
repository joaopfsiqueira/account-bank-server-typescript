/**
 * Criando controler, vai utilizar o repository do typeorm na sua ÚLTIMA VERSÃO! Poderia ser apenas o entity manager, mas por questão de entendimento de código, optei por usar o repository.
 */

import { Request, Response, NextFunction } from 'express';
import { createUserSchema } from './UsersSchema';
import * as userService from './UserService';
import { getErrorMessage } from '../../common/GetErrorMessage';

export default class UsersControllers {
  public async validateParamsUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validation = createUserSchema.validate(req.body);
      if (validation.error) {
        if (validation.error.details[0].type === 'string.pattern.base') {
          return res.status(400).send({
            field: 'password',
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
    try {
      await userService.createUser(username, password);

      return res.status(200).send({
        Message: 'Usuário criado com sucesso!',
      });
    } catch (error) {
      return res.status(400).send(getErrorMessage(error));
    }
  }

  public async balance(req: Request, res: Response): Promise<Response> {
    const username = req.username;
    try {
      //validando parametros pelo metodo validate do joi.
      const returnBalance = await userService.userBalance(username);
      res.send({ Saldo: `R$ ${returnBalance}`, Usuário: `${username}` });
    } catch (error) {
      return res.status(404).send(getErrorMessage(error));
    }
  }
}
