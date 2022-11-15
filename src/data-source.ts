import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Accounts } from './entity/Accounts';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'account-bank',
  synchronize: true,
  logging: false,
  entities: [Accounts],
  migrations: [],
  subscribers: [],
});
