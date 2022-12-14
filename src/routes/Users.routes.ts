import { Router } from 'express'; //roteia as rotas, informa que tem algo acessando e ve se a rota que ele está tentando acessar existe.
import UsersControllers from '../domain/user/UsersController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

//exportando rota para utilizar no server.
export const UserRouter = Router();

//instânciando controllers
const UserController = new UsersControllers();
/**
 * Serviço para salvar um novo usuario.
 */

UserRouter.post('/', UserController.validateParamsUser, UserController.create);
UserRouter.get('/balance', AuthMiddleware, UserController.balance);
