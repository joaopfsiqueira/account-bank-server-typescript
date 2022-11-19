import { Accounts } from '../domain/account/AccountsEntity';
import { AccountRepository } from '../repository/pgSQL/Repositories-pgSQL';

export class CheckBalance {
  public async CheckUserBalance(
    debitedAccount: Accounts,
    value: number
  ): Promise<Boolean> {
    const accountBalance = await AccountRepository.findOneBy({
      id: debitedAccount.id,
    });

    if (accountBalance.balance < value) {
      return false;
    } else {
      return true;
    }
  }
}
