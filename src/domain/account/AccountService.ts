import { Accounts } from '../account/AccountsEntity';
import { AccountRepository } from '../../repository/pgSQL/AccountRepository-pgSQL';

export class AccountService {
  public async createAccount(): Promise<Accounts> {
    const newAccount = new Accounts();
    return await AccountRepository.save(newAccount);
  }
}
