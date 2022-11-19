import {
  UserRepository,
  AccountRepository,
  TransactionRepository,
} from '../../repository/pgSQL/Repositories-pgSQL';

import { Transactions } from './TransactionsEntity';
import { Accounts } from '../account/AccountsEntity';
import { Users } from '../user/UsersEntity';
import { FormatTransaction } from '../../common/FormatTransaction';
import { MoreThan } from 'typeorm';

export async function getCreditedAccount(
  creditedUsername: string
): Promise<Users> {
  const creditedUsernameAccount = await UserRepository.findOne({
    relations: {
      account: true,
    },
    where: [{ username: creditedUsername }],
  });

  return creditedUsernameAccount;
}

export async function createTransaction(
  value: number,
  debitedAccount: Accounts,
  creditedUsernameAccount: Users
): Promise<Transactions> {
  //pegando a account do username que vai receber a transferência!

  const newTransaction = new Transactions(
    value,
    debitedAccount,
    creditedUsernameAccount.account
  );

  // atualizando
  const updateDebitedAccount = await AccountRepository.findOneBy({
    id: debitedAccount.id,
  });
  updateDebitedAccount.balance = updateDebitedAccount.balance - value;

  const updateCreditedAccount = await AccountRepository.findOneBy({
    id: creditedUsernameAccount.account.id,
  });
  updateCreditedAccount.balance = updateCreditedAccount.balance + value; // como o + transforma em string, criei um transformer na entity para resolver o problema.

  await AccountRepository.save(updateCreditedAccount);
  await AccountRepository.save(updateDebitedAccount);
  return await TransactionRepository.save(newTransaction);
}

export async function getUserTransactions(account: number): Promise<Object[]> {
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

  const formatTransaction = new FormatTransaction();
  const formatedTransaction = formatTransaction.insert(transactionsUser);

  return formatedTransaction;
}

export async function getUserTransactionsByDate(date: Date): Promise<Object[]> {
  const transactionsUser = await TransactionRepository.find({
    relations: ['debitedAccount', 'creditedAccount'],
    where: {
      createdAt: MoreThan(date),
    },
  });
  console.log(transactionsUser);
  const formatTransaction = new FormatTransaction();
  const formatedTransaction = formatTransaction.insert(transactionsUser);

  return formatedTransaction;
}

export async function getUserTransactionsByCashOut(
  account: number
): Promise<Object[]> {
  const transactionsUser = await TransactionRepository.find({
    relations: ['debitedAccount', 'creditedAccount'],
    where: {
      debitedAccount: {
        id: account,
      },
    },
  });

  const formatTransaction = new FormatTransaction();
  const formatedTransaction = formatTransaction.insert(transactionsUser);

  return formatedTransaction;
}

export async function getUserTransactionsByCashIn(
  account: number
): Promise<Object[]> {
  const transactionsUser = await TransactionRepository.find({
    relations: ['debitedAccount', 'creditedAccount'],
    where: {
      creditedAccount: {
        id: account,
      },
    },
  });

  const formatTransaction = new FormatTransaction();
  const formatedTransaction = formatTransaction.insert(transactionsUser);

  return formatedTransaction;
}
