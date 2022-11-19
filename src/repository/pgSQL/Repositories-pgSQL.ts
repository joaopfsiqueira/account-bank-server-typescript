import { Accounts } from '../../domain/account/AccountsEntity';
import { Transactions } from '../../domain/transaction/TransactionsEntity';
import { AppDataSource } from '../../data-source';
import { Users } from '../../domain/user/UsersEntity';

export const AccountRepository = AppDataSource.getRepository(Accounts); //Conectando ao repository! Ou melhor, db!
export const TransactionRepository = AppDataSource.getRepository(Transactions);
export const UserRepository = AppDataSource.getRepository(Users);
