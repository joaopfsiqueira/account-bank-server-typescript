/**
 * Criando controler, vai utilizar o entity manager do typeorm na sua ÚLTIMA VERSÃO!
 */

import { Accounts } from '../entity/Accounts';
import { AppDataSource } from '../data-source';
import { Users } from '../entity/Users'; //apenas para tipagem

export class UsersControllers {
  async salvar(user: Users) {
    //criando usuário
    await AppDataSource.manager.save(user);
    return user;
  }
}
