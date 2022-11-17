import { Router } from 'express'; //roteia as rotas, informa que tem algo acessando e ve se a rota que ele está tentando acessar existe.
import { UsersControllers } from '../controller/UsersController';
import { Users } from '../entity/Users';

export const userRouter = Router();
const userController = new UsersControllers();
/**
 * Serviço para salvar um novo usuario.
 */

userRouter.post('/', async (req, res) => {
  const { username, password } = req.body; // associação por desestruturação.
  const user = new Users(username, password);
  const userSave = await userController.salvar(user);
  res.json(userSave);
});
