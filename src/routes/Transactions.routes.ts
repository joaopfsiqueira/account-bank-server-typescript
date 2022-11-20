import { Router } from 'express'; //roteia as rotas, informa que tem algo acessando e ve se a rota que ele está tentando acessar existe.
import { TransactionsController } from '../domain/transaction/TransactionsController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
//exportando rota para utilizar no server.
export const TransactionRouter = Router();

//instânciando controllers
const TransactionController = new TransactionsController();
/**
 * Serviço para salvar um novo usuario.
 */

TransactionRouter.post(
  '/',
  AuthMiddleware,
  TransactionController.validateParamsTransaction,
  TransactionController.create
);

TransactionRouter.get(
  '/user',
  AuthMiddleware,
  TransactionController.transactions
);
TransactionRouter.get(
  '/user/cashout',
  AuthMiddleware,
  TransactionController.transactionsCashOut
);

TransactionRouter.get(
  '/user/cashin',
  AuthMiddleware,
  TransactionController.transactionsCashIn
);
TransactionRouter.get(
  '/user/bydate',
  AuthMiddleware,
  TransactionController.transactionsDate
);
