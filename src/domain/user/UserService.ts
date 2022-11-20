import { UserRepository } from '../../repository/pgSQL/Repositories-pgSQL';
import { Users } from './UsersEntity';
import * as AccountService from '../account/AccountService';

export async function findByUsername(username: string): Promise<Users> {
  return await UserRepository.findOneBy({
    username,
  });
}

export async function createUser(
  username: string,
  password: string
): Promise<Users> {
  try {
    if (await this.findByUsername(username)) {
      throw new Error('Usuario já cadastrado!');
    } else {
      const newAccount = await AccountService.createAccount();
      const newUser = new Users(username, password, newAccount);
      const createdUser = await UserRepository.save(newUser);
      delete createdUser.password;
      return createdUser;
    }
  } catch (error) {
    throw error;
  }
}

export async function userBalance(username: string): Promise<number> {
  try {
    const balanceValue = await UserRepository.findOne({
      relations: {
        account: true,
      },
      where: { username },
    });
    return balanceValue.account.balance;
  } catch (error) {
    throw new Error('Usuário não localizado!');
  }
}
