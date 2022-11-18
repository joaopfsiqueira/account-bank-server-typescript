/**
 * Criando controler, vai utilizar o entity manager do typeorm na sua ÚLTIMA VERSÃO!
 */

import { Accounts } from '../entity/Accounts';
import { AppDataSource } from '../data-source';

export class AccountsController {
  public async salvar() {
    //criando Account
    const accountRepository = AppDataSource.getRepository(Accounts);
    const account = new Accounts();
    await accountRepository.save(account);
    return account;
  }
}
