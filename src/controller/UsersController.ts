/**
 * Criando controler, vai utilizar o entity manager do typeorm na sua ÚLTIMA VERSÃO!
 */

import { AppDataSource } from '../data-source';
import { Accounts } from '../entity/Accounts'; // apenas para tipagem
import { Users } from '../entity/Users'; //apenas para tipagem

export class UsersControllers {
  async salvar(user: Users, accountCreated: Accounts) {
    //criando usuário
    await AppDataSource.manager.save(user);
    return user;
  }
}
