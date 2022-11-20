import { Accounts } from '../domain/account/AccountsEntity';
import { AccountRepository } from '../repository/pgSQL/Repositories-pgSQL';

export async function CheckUserBalance(
  debitedAccount: number,
  value: number
): Promise<Boolean> {
  const accountBalance = await AccountRepository.findOneBy({
    id: debitedAccount,
  });

  if (accountBalance.balance < value) {
    return false;
  } else {
    return true;
  }
}
