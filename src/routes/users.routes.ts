import { Router } from 'express'; //roteia as rotas, informa que tem algo acessando e ve se a rota que ele está tentando acessar existe.
import UsersControllers from '../controller/UsersController';

//exportando rota para utilizar no server.
export const userRouter = Router();

//instânciando controllers
const userController = new UsersControllers();
/**
 * Serviço para salvar um novo usuario.
 */

userRouter.post('/', userController.validateParamsUser, userController.create);
