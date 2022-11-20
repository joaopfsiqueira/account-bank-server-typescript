import bcrypt = require('bcrypt');
import { UserRepository } from '../../repository/pgSQL/Repositories-pgSQL';
import { Users } from '../user/UsersEntity';

export async function loginUser(
  username: string,
  password: string
): Promise<Users> {
  try {
    const loginUser = await UserRepository.findOne({
      where: {
        username: username,
      },
    });

    if (!loginUser) {
      throw new Error('Username incorreto!');
    }

    const isMatch = bcrypt.compareSync(password, loginUser.password);
    if (isMatch) {
      return loginUser;
    } else {
      throw new Error('Senha errada!');
    }
  } catch (error) {
    throw error;
  }
}
