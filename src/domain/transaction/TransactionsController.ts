import { Request, Response } from 'express';
import { TransactionsService } from './TransactionsService';

export class TransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { value, debitedAccount, creditedUsername } = req.body;

    const transactionService = new TransactionsService();
    const creditedUsernameAccount = await transactionService.getCreditedAccount(
      creditedUsername
    );

    if (creditedUsernameAccount) {
      const newTransaction = await transactionService.createTransaction(
        value,
        debitedAccount,
        creditedUsernameAccount
      );

      return res.send(newTransaction);
    } else {
      return res.status(400).send({
        Message: 'Usuário não localizado!',
      });
    }
  }
}
