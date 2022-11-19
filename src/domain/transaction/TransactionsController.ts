import { Request, Response } from 'express';
import { TransactionsService } from './TransactionsService';
import { CheckBalance } from '../../common/checkBalance';

export class TransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { value, debitedAccount, creditedUsername } = req.body;

    const transactionService = new TransactionsService();
    const creditedUsernameAccount = await transactionService.getCreditedAccount(
      creditedUsername
    );

    const balance = new CheckBalance();
    const haveBalance = await balance.CheckUserBalance(debitedAccount, value);
    if (haveBalance === true) {
      if (creditedUsernameAccount.account.id != debitedAccount) {
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
      } else {
        return res.status(400).send({
          Message: 'Ops! Não é possível transferir para sua própria conta!',
        });
      }
    } else {
      return res.status(400).send({
        Message: 'Saldo insuficiente!',
      });
    }
  }
}
