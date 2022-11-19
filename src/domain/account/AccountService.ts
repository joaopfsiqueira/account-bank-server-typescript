import { Accounts } from '../account/AccountsEntity';
import { AccountRepository } from '../../repository/pgSQL/Repositories-pgSQL';

export async function createAccount(): Promise<Accounts> {
  const newAccount = new Accounts();
  return await AccountRepository.save(newAccount);
}
