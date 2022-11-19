import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Accounts } from './domain/account/AccountsEntity';
import { Users } from './domain/user/UsersEntity';
import { Transactions } from './domain/transaction/TransactionsEntity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'account-bank',
  synchronize: true,
  logging: false,
  entities: [Accounts, Users, Transactions],
  migrations: [],
  subscribers: [],
});
