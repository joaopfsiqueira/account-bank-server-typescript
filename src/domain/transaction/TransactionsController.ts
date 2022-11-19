import { Request, Response } from 'express';
import { TransactionsService } from './TransactionsService';
import { CheckBalance } from '../../common/CheckBalance';
import { TransactionSchema } from './TransactionsSchema';

const transactionService = new TransactionsService();

export class TransactionsController {
  public async validateParamsTransaction(req: Request, res: Response, next) {
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
    const { value, debitedAccount, creditedUsername } = req.body;

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
  public async transactions(req: Request, res: Response): Promise<Response> {
    const { account } = req.body;

    try {
      const returnTransactions = await transactionService.userTransactions(
        account
      );
      if (returnTransactions.length > 0) {
        res.send(returnTransactions);
      } else {
        res
          .status(404)
          .send({
            Message: 'Não existe transações realizadas por esse usuário!',
          });
      }
    } catch (error) {
      return res.status(400).send({ Message: error });
    }
  }
}
