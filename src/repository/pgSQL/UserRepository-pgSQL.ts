import { AppDataSource } from '../../data-source';
import { Users } from '../../domain/user/UsersEntity';

export const UserRepository = AppDataSource.getRepository(Users); //Conectando ao repository! Ou melhor, db!
