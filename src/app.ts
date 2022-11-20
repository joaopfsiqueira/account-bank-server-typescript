import * as express from 'express';
import * as bodyParser from 'body-parser'; // recebendo json e enviando json.
import * as cors from 'cors'; // liberando acesso para o front!
import * as logger from 'morgan';

import { AppDataSource } from './data-source';
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
    console.log(
      'Here you can setup and run express / fastify / any other framework.'
    );
  })
  .catch((error) => console.log(error));
