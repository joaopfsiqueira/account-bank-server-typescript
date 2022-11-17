/**
 * Criando controler, vai utilizar o entity manager do typeorm na sua ÚLTIMA VERSÃO!
 */

import { Accounts } from '../entity/Accounts';
import { AppDataSource } from '../data-source';

export class AccountsController {
  async salvar() {
    //criando Account
    const account = new Accounts();
    await AppDataSource.manager.save(account);
    return account;
  }
}
