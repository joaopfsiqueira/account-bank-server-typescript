import { UserRepository } from '../../repository/pgSQL/UserRepository-pgSQL';
import { Users } from './UsersEntity';
import { AccountService } from '../account/AccountService';
import bcrypt = require('bcrypt');

export class UserService {
  public async findByUsername(username: string): Promise<Users> {
    return await UserRepository.findOneBy({
      username,
    });
  }

  public async createUser(username: string, password: string): Promise<Users> {
    const Account = new AccountService();
    const newAccount = await Account.createAccount();
    const newUser = new Users(username, password, newAccount);
    newUser.password = bcrypt.hashSync(password, 10); //pass + saltRounds
    return UserRepository.save(newUser);
  }
}
