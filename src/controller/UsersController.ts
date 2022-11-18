/**
 * Criando controler, vai utilizar o repository do typeorm na sua ÚLTIMA VERSÃO! Poderia ser apenas o entity manager, mas por questão de entendimento de código, optei por usar o repository.
 */

import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Users } from '../entity/Users';
import { AccountsController } from './AccountsController';
import { userSchema } from '../utils/validator/usersSchema';
import bcrypt = require('bcrypt');

export const userRepository = AppDataSource.getRepository(Users); //Conectando ao repository! Ou melhor, db!

export default class UsersControllers {
  public async validateParamsUser(req: Request, res: Response, next) {
    try {
      const validation = userSchema.validate(req.body);
      if (validation.error) {
        if (validation.error.details[0].type === 'string.pattern.base') {
          return res.status(400).send({
            Error:
              'Senha deve conter ao menos 8 caracteres, uma letra maíuscula, 1 caracter especial e 1 número!',
          });
        }
        return res.status(400).send({
          Error: validation.error.message,
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

    const checkIfExist = await userRepository.findOneBy({
      username: username,
    });

    if (checkIfExist === null) {
      const accountController = new AccountsController();
      const accountCreated = await accountController.create();
      const user = new Users(username, password, accountCreated); // a criação de constructor permitiu fazer dessa mandeira, caso contrario eu teria que fazer user.username = username, e por assim vai!
      user.password = bcrypt.hashSync(password, 10); //pass + saltRounds
      await userRepository.save(user); //salvando - poderia ser:   await AppDataSource.manager.save(user);
      return res.send(user);
    } else {
      return res.status(400).send({
        Message: 'Username já cadastrado!',
      });
    }
  }
}
