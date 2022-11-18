/**
 * Criando controler, vai utilizar o entity manager do typeorm na sua ÚLTIMA VERSÃO!
 */

import { Accounts } from '../entity/Accounts';
import { AppDataSource } from '../data-source';

export const accountRepository = AppDataSource.getRepository(Accounts); //Conectando ao repository! Ou melhor, db!

export class AccountsController {
  public async create() {
    //criando Account
    const account = new Accounts();
    await accountRepository.save(account);
    return account;
  }
}
