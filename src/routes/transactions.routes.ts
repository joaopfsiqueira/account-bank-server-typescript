import { Router } from 'express'; //roteia as rotas, informa que tem algo acessando e ve se a rota que ele está tentando acessar existe.
import { TransactionsController } from '../domain/transaction/TransactionsController';

//exportando rota para utilizar no server.
export const transactionRouter = Router();

//instânciando controllers
const transactionController = new TransactionsController();
/**
 * Serviço para salvar um novo usuario.
 */

transactionRouter.post('/', transactionController.create);
