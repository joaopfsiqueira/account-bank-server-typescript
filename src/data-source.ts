import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Accounts } from './entity/Accounts';
import { Users } from './entity/Users';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '172.28.198.29',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'account-bank',
  synchronize: true,
  logging: false,
  entities: [Accounts, Users],
  migrations: [],
  subscribers: [],
});
