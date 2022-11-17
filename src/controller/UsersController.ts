/**
 * Criando controler, vai utilizar o entity manager do typeorm na sua ÚLTIMA VERSÃO!
 */

import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Users } from '../entity/Users';
import { AccountsController } from './AccountsController';
import { userSchema } from '../utils/validator/usersSchema';

export default class UsersControllers {
  public async create(req: Request, response: Response): Promise<Response> {
    const { username, password } = req.body; // associação por desestruturação.
    const accountController = new AccountsController();
    const accountCreated = await accountController.salvar();
    const user = new Users(username, password, accountCreated); // a criação de constructor permitiu fazer dessa mandeira, caso contrario eu teria que fazer user.username = username, e por assim vai!
    //criando usuário
    await AppDataSource.manager.save(user);
    return response.json(user);
  }
}
