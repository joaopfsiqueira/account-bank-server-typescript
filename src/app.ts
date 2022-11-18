import * as express from 'express';
import * as bodyParser from 'body-parser'; // recebendo json e enviando json.
import * as cors from 'cors'; // liberando acesso para o front!
import * as logger from 'morgan';

import { AppDataSource } from './data-source';
import { Accounts } from './entity/Accounts';
import { Users } from './entity/Users';
import { Transactions } from './entity/Transactions';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { resolve } from 'path';
dotenv.config();

// criando app
export const app = express();

// liberando TODO acesso aos serviços.
app.use(cors());

// permite receber e enviar json.
app.use(bodyParser.json());

// gerando logs detalhados com morgan
app.use(logger('dev'));

// conecta no banco
AppDataSource.initialize()
  .then(async () => {
    // const account = new Accounts();
    // const account2 = new Accounts(); // nãoo preciso especificar o value, já que na entity eu seto um valor padrão.

    // await AppDataSource.manager.save(account);
    // await AppDataSource.manager.save(account2);
    // console.log('Saved a new account with id: ' + account.id);

    // const user = new Users();
    // user.username = '@Joaopfsiqueira';
    // user.password = '123';
    // user.account = account;

    // const user2 = new Users();
    // user2.username = '@Romasiqueira';
    // user2.password = '123';
    // user2.account = account2;

    // await AppDataSource.manager.save(user);
    // await AppDataSource.manager.save(user2);
    // console.log('Saved a new Users with id: ' + user.id);

    // console.log('Loading users from the database...');
    // const users = await AppDataSource.manager.find(Users);
    // console.log('Loaded users: ', users);

    // const transaction = new Transactions();
    // transaction.value = 50;
    // transaction.debitedAccount = account;
    // transaction.creditedAccount = account2;

    // await AppDataSource.manager.save(transaction);

    // account.balance = account.balance - transaction.value; //debito
    // account2.balance = account2.balance + transaction.value; // credito o problema é que acha que vai concatenar por conta do +, dito isso, criei um transformer
    // console.log(account2.balance);

    // await AppDataSource.manager.save(account2);
    // await AppDataSource.manager.save(account);

    console.log(
      'Here you can setup and run express / fastify / any other framework.'
    );
  })
  .catch((error) => console.log(error));
