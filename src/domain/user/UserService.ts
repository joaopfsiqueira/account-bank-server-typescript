import {
  UserRepository,
  TransactionRepository,
} from '../../repository/pgSQL/Repositories-pgSQL';
import { Users } from './UsersEntity';
import { Transactions } from '../transaction/TransactionsEntity';
import { Accounts } from '../account/AccountsEntity';
import { AccountService } from '../account/AccountService';
import bcrypt = require('bcrypt');

export class UserService {
  public async findByUsername(username: string): Promise<Users> {
    return await UserRepository.findOneBy({
      username,
    });
  }

  public async createUser(username: string, password: string): Promise<Users> {
    const Account = new AccountService();
    const newAccount = await Account.createAccount();
    const newUser = new Users(username, password, newAccount);
    newUser.password = bcrypt.hashSync(password, 10); //pass + saltRounds
    return await UserRepository.save(newUser);
  }

  public async userBalance(username: string): Promise<number> {
    const balanceValue = await UserRepository.findOne({
      relations: {
        account: true,
      },
      where: [{ username }],
    });

    return balanceValue.account.balance;
  }
  public async userTransactions(account: Accounts): Promise<Transactions> {
    const userTransactions = await TransactionRepository.findOne({
      relations: {
        debitedAccount: true,
        creditedAccount: true,
      },
      where: [{ creditedAccount: account, debitedAccount: account }],
    });

    return userTransactions;
  }
}
