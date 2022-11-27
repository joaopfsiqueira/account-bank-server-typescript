import { Request, Response, NextFunction } from 'express';
import * as transactionService from './TransactionsService';

import { TransactionSchema } from './TransactionsSchema';
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
      await transactionService.createTransaction(
        value,
        debitedAccount,
        creditedUsername
      );

      return res.status(200).send({
        Message: 'Transferência realizada com sucesso!',
      });
    } catch (error) {
      return res.status(400).send(getErrorMessage(error));
    }
  }

  public async transactions(req: Request, res: Response): Promise<Response> {
    const username = req.username;

    try {
      const returnTransactions = await transactionService.getUserTransactions(
        username
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
    const username = req.username;

    try {
      const returnTransactions =
        await transactionService.getUserTransactionsByCashOut(username);

      res.send(returnTransactions);
    } catch (error) {
      return res.status(404).send(getErrorMessage(error));
    }
  }

  public async transactionsCashIn(
    req: Request,
    res: Response
  ): Promise<Response> {
    const username = req.username;

    try {
      const returnTransactions =
        await transactionService.getUserTransactionsByCashIn(username);
      res.send(returnTransactions);
    } catch (error) {
      return res.status(404).send(getErrorMessage(error));
    }
  }

  public async transactionsDate(
    req: Request,
    res: Response
  ): Promise<Response> {
    const username = req.username;
    const { date } = req.query;

    try {
      const returnTransactions =
        await transactionService.getUserTransactionsByDate(
          date as any,
          username
        );

      res.send(returnTransactions);
    } catch (error) {
      return res.status(404).send(getErrorMessage(error));
    }
  }
}
