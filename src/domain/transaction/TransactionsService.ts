import {
  UserRepository,
  AccountRepository,
  TransactionRepository,
} from '../../repository/pgSQL/Repositories-pgSQL';

import { Transactions } from './TransactionsEntity';
import { Accounts } from '../account/AccountsEntity';
import { Users } from '../user/UsersEntity';

export class TransactionsService {
  public async getCreditedAccount(creditedUsername: string): Promise<Users> {
    const creditedUsernameAccount = await UserRepository.findOne({
      relations: {
        account: true,
      },
      where: [{ username: creditedUsername }],
    });

    return creditedUsernameAccount;
  }

  public async createTransaction(
    value: number,
    debitedAccount: Accounts,
    creditedUsernameAccount: Users
  ): Promise<Transactions> {
    //pegando a account do username que vai receber a transferência!

    const newTransaction = new Transactions(
      value,
      debitedAccount,
      creditedUsernameAccount.account
    );

    // atualizando
    const updateDebitedAccount = await AccountRepository.findOneBy({
      id: debitedAccount.id,
    });
    updateDebitedAccount.balance = updateDebitedAccount.balance - value;

    const updateCreditedAccount = await AccountRepository.findOneBy({
      id: creditedUsernameAccount.account.id,
    });
    updateCreditedAccount.balance = updateCreditedAccount.balance + value; // como o + transforma em string, criei um transformer na entity para resolver o problema.

    await AccountRepository.save(updateCreditedAccount);
    await AccountRepository.save(updateDebitedAccount);
    return await TransactionRepository.save(newTransaction);
  }
}
