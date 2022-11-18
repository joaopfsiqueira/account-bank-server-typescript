/**
 * Criando controler, vai utilizar o repository do typeorm na sua ÚLTIMA VERSÃO! Poderia ser apenas o entity manager, mas por questão de entendimento de código, optei por usar o repository.
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
