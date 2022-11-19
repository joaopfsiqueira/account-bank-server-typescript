import { Router } from 'express'; //roteia as rotas, informa que tem algo acessando e ve se a rota que ele está tentando acessar existe.
import { TransactionsController } from '../domain/transaction/TransactionsController';

//exportando rota para utilizar no server.
export const TransactionRouter = Router();

//instânciando controllers
const TransactionController = new TransactionsController();
/**
 * Serviço para salvar um novo usuario.
 */

TransactionRouter.post(
  '/',
  TransactionController.validateParamsTransaction,
  TransactionController.create
);

TransactionRouter.get('/user', TransactionController.transactions);
TransactionRouter.get(
  '/user/cashout',
  TransactionController.transactionsCashOut
);
