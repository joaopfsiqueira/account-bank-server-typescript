import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Accounts } from './entity/Accounts';
import { Users } from './entity/Users';
import { Transactions } from './entity/Transactions';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '172.23.66.106',
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
