import { Request, Response, NextFunction } from 'express';
import * as transactionService from './TransactionsService';

import {
  TransactionSchema,
  TransactionsUserSchema,
} from './TransactionsSchema';
import { getErrorMessage } from '../../common/GetErrorMessage';

export class TransactionsController {
  public async validateParamsTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validation = TransactionSchema.validate(req.body);
      if (validation.error) {
        return res.status(400).send({
          Message: validation.error.message,
        });
      }

      next();
    } catch (error) {
      return res.status(400).json('Ocorreu um erro ao tentar transferir!');
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { value, creditedUsername } = req.body;
    const debitedAccount = req.username;

    try {
      const newTransaction = await transactionService.createTransaction(
        value,
        debitedAccount,
        creditedUsername
      );

      return res.send(newTransaction);
    } catch (error) {
      return res.status(400).send(getErrorMessage(error));
    }
  }

  public async transactions(req: Request, res: Response): Promise<Response> {
    const { account } = req.body;

    try {
      const userTransactionsValidation = TransactionsUserSchema.validate(
        req.body
      );

      if (userTransactionsValidation.error) {
        return res.status(400).send({
          Message: userTransactionsValidation.error.message,
        });
      }
      const returnTransactions = await transactionService.getUserTransactions(
        account
      );
      res.send(returnTransactions);
    } catch (error) {
      return res.status(404).send(getErrorMessage(error));
    }
  }

  public async transactionsCashOut(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { account } = req.body;

    try {
      const userTransactionsValidation = TransactionsUserSchema.validate(
        req.body
      );

      if (userTransactionsValidation.error) {
        return res.status(400).send({
          Message: userTransactionsValidation.error.message,
        });
      }
      const returnTransactions =
        await transactionService.getUserTransactionsByCashOut(account);

      res.send(returnTransactions);
    } catch (error) {
      return res.status(404).send(getErrorMessage(error));
    }
  }

  public async transactionsCashIn(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { account } = req.body;

    try {
      const userTransactionsValidation = TransactionsUserSchema.validate(
        req.body
      );

      if (userTransactionsValidation.error) {
        return res.status(400).send({
          Message: userTransactionsValidation.error.message,
        });
      }
      const returnTransactions =
        await transactionService.getUserTransactionsByCashIn(account);
      res.send(returnTransactions);
    } catch (error) {
      return res.status(404).send(getErrorMessage(error));
    }
  }

  public async transactionsDate(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { date } = req.body;

    try {
      const returnTransactions =
        await transactionService.getUserTransactionsByDate(date);

      res.send(returnTransactions);
    } catch (error) {
      return res.status(404).send(getErrorMessage(error));
    }
  }
}
