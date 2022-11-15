import * as express from 'express';
import * as bodyParser from 'body-parser'; // recebendo json e enviando json.
import * as cors from 'cors'; // liberando acesso para o front!
import * as logger from 'morgan';
import { AppDataSource } from './data-source';
import { Accounts } from './entity/Accounts';
import { Users } from './entity/Users';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
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
    console.log('Inserting a new user into the database...');

    const account = new Accounts();
    account.balance = 100;

    await AppDataSource.manager.save(account);
    console.log('Saved a new account with id: ' + account.id);

    const user = new Users();
    user.username = '@Joaopfsiqueira';
    user.password = '123';

    await AppDataSource.manager.save(user);
    console.log('Saved a new Users with id: ' + user.id);

    console.log('Loading users from the database...');
    const users = await AppDataSource.manager.find(Users);
    console.log('Loaded users: ', users);

    console.log(
      'Here you can setup and run express / fastify / any other framework.'
    );
  })
  .catch((error) => console.log(error));
