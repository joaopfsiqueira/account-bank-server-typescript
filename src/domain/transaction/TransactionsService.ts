import {
  UserRepository,
  AccountRepository,
  TransactionRepository,
} from '../../repository/pgSQL/Repositories-pgSQL';

import { Transactions } from './TransactionsEntity';
import { Users } from '../user/UsersEntity';
import * as formatTransaction from '../../common/FormatTransaction';
import * as balance from '../../common/CheckBalance';
import { MoreThan } from 'typeorm';
import { resolve } from 'path';

export async function getAccount(username: string): Promise<number> {
  //não é preciso try cat, uma vez que para chegar aqui, os erros estão sendo tratados no middleware de auth.
  const debitedIdAccount = await UserRepository.findOne({
    relations: {
      account: true,
    },
    where: { username },
  });

  return debitedIdAccount.account.id;
}

export async function getCreditedAccount(
  creditedUsername: string
): Promise<Users> {
  try {
    const creditedUsernameAccount = await UserRepository.findOne({
      relations: {
        account: true,
      },
      where: [{ username: creditedUsername }],
    });

    if (creditedUsernameAccount) {
      return creditedUsernameAccount;
    } else {
      throw new Error('Usuário não localizado!');
    }
  } catch (error) {
    throw error;
  }
}

export async function createTransaction(
  value: number,
  username: string,
  creditedUsername: string
): Promise<Object> {
  //pegando a account do username que vai receber a transferência!
  try {
    const debitedAccount = await this.getAccount(username);
    const creditedUsernameAccount = await this.getCreditedAccount(
      creditedUsername
    );
    const haveBalance = await balance.CheckUserBalance(debitedAccount, value);

    if (haveBalance === true) {
      if (creditedUsernameAccount.account.id != debitedAccount) {
        const newTransaction = new Transactions(
          value,
          debitedAccount,
          creditedUsernameAccount.account
        );

        // atualizando conta que foi debitada
        const updateDebitedAccount = await AccountRepository.findOneBy({
          id: debitedAccount.id,
        });
        updateDebitedAccount.balance = updateDebitedAccount.balance - value;
        await AccountRepository.save(updateDebitedAccount);

        // atualizando conta que foi creditada
        const updateCreditedAccount = await AccountRepository.findOneBy({
          id: creditedUsernameAccount.account.id,
        });
        updateCreditedAccount.balance = updateCreditedAccount.balance + value; // como o + transforma em string, criei um transformer na entity para resolver o problema.

        await AccountRepository.save(updateCreditedAccount);

        return await TransactionRepository.save(newTransaction);
      } else {
        throw new Error(
          'Ops! Não é possível transferir para sua própria conta!'
        );
      }
    } else {
      throw new Error('Saldo insuficiente!');
    }
  } catch (error) {
    throw error;
  }
}

export async function getUserTransactions(username: string): Promise<Object[]> {
  try {
    const account = await this.getAccount(username);
    const transactionsUser = await TransactionRepository.find({
      relations: ['debitedAccount', 'creditedAccount'],
      where: [
        {
          debitedAccount: {
            id: account,
          },
        },
        {
          creditedAccount: {
            id: account,
          },
        },
      ],
    });
    if (transactionsUser.length > 0) {
      const formatedTransaction = formatTransaction.insert(transactionsUser);

      return formatedTransaction;
    } else {
      throw new Error('Não existe transações realizadas por esse usuário!');
    }
  } catch (error) {
    throw error;
  }
}

export async function getUserTransactionsByDate(date: Date): Promise<Object[]> {
  try {
    const transactionsUser = await TransactionRepository.find({
      relations: ['debitedAccount', 'creditedAccount'],
      where: {
        createdAt: MoreThan(date),
      },
    });

    if (transactionsUser.length > 0) {
      const formatedTransaction = formatTransaction.insert(transactionsUser);
      return formatedTransaction;
    } else {
      throw new Error('Não existe transações realizadas nesse data!');
    }
  } catch (error) {
    throw error;
  }
}

export async function getUserTransactionsByCashOut(
  username: string
): Promise<Object[]> {
  try {
    const account = await this.getAccount(username);
    const transactionsUser = await TransactionRepository.find({
      relations: ['debitedAccount', 'creditedAccount'],
      where: {
        debitedAccount: {
          id: account,
        },
      },
    });

    if (transactionsUser.length > 0) {
      const formatedTransaction = formatTransaction.insert(transactionsUser);

      return formatedTransaction;
    } else {
      throw new Error('Não existe CashOuts realizados por esse usuário!');
    }
  } catch (error) {
    throw error;
  }
}

export async function getUserTransactionsByCashIn(
  username: string
): Promise<Object[]> {
  try {
    const account = await this.getAccount(username);
    const transactionsUser = await TransactionRepository.find({
      relations: ['debitedAccount', 'creditedAccount'],
      where: {
        creditedAccount: {
          id: account,
        },
      },
    });

    if (transactionsUser.length > 0) {
      const formatedTransaction = formatTransaction.insert(transactionsUser);

      return formatedTransaction;
    } else {
      throw new Error('Não existe CashIns realizados por esse usuário!');
    }
  } catch (error) {
    throw error;
  }
}
