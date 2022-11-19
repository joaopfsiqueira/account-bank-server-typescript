import { Accounts } from '../../domain/account/AccountsEntity';
import { AppDataSource } from '../../data-source';

export const AccountRepository = AppDataSource.getRepository(Accounts); //Conectando ao repository! Ou melhor, db!
