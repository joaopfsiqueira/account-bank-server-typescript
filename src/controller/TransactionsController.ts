/**
 * Criando controler, vai utilizar o repository do typeorm na sua ÚLTIMA VERSÃO! Poderia ser apenas o entity manager, mas por questão de entendimento de código, optei por usar o repository.
 */

import { Transactions } from '../entity/Transactions';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { userRepository } from './UsersController';
import { accountRepository } from './AccountsController';

//Conectando ao repository! Ou melhor, db!
export const transactionRepository = AppDataSource.getRepository(Transactions);

export class TransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { value, debitedAccount, creditedUsername } = req.body;

    const creditedUsernameAccount = await userRepository.findOne({
      relations: {
        account: true,
      },
      where: [{ username: creditedUsername }],
    });

    if (creditedUsernameAccount != null) {
      const transaction = new Transactions(
        value,
        debitedAccount,
        creditedUsernameAccount.account
      );

      const updateDebitedAccount = await accountRepository.findOneBy({
        id: debitedAccount,
      });
      updateDebitedAccount.balance = updateDebitedAccount.balance - value;
      console.log(updateDebitedAccount);

      const updateCreditedAccount = await accountRepository.findOneBy({
        id: creditedUsernameAccount.account.id,
      });

      updateCreditedAccount.balance = updateCreditedAccount.balance + value; // como o + transforma em string, criei um transformer na entity para resolver o problema.

      await accountRepository.save(updateCreditedAccount);
      await accountRepository.save(updateDebitedAccount);
      await transactionRepository.save(transaction);

      res.send(transaction);
    } else {
      return res.status(400).send({
        Message: 'Usuário não localizado!',
      });
    }
  }
}
