import {
  UserRepository,
  TransactionRepository,
} from '../../repository/pgSQL/Repositories-pgSQL';
import { Users } from './UsersEntity';
import * as AccountService from '../account/AccountService';
import bcrypt = require('bcrypt');

export async function findByUsername(username: string): Promise<Users> {
  return await UserRepository.findOneBy({
    username,
  });
}

export async function createUser(
  username: string,
  password: string
): Promise<Users> {
  const newAccount = await AccountService.createAccount();
  const newUser = new Users(username, password, newAccount);
  newUser.password = bcrypt.hashSync(password, 10); //pass + saltRounds
  return await UserRepository.save(newUser);
}

export async function loginUser(user: Users): Promise<Users> {
  try {
    const loginUser = await UserRepository.findOne({
      where: [
        {
          username: user.username,
        },
        {
          password: user.password,
        },
      ],
    });
    return loginUser;
  } catch (error) {
    throw error;
  }
}

export async function userBalance(username: string): Promise<number> {
  const balanceValue = await UserRepository.findOne({
    relations: {
      account: true,
    },
    where: [{ username }],
  });

  return balanceValue.account.balance;
}
