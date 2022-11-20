import { Router } from 'express'; //roteia as rotas, informa que tem algo acessando e ve se a rota que ele está tentando acessar existe.
import AuthController from '../domain/auth/AuthController';

//exportando rota para utilizar no server.
export const UserRouter = Router();

//instânciando controllers
const authController = new AuthController();
/**
 * Serviço para salvar um novo usuario.
 */

UserRouter.post('/', authController.login);
