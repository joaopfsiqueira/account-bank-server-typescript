import { Router } from 'express'; //roteia as rotas, informa que tem algo acessando e ve se a rota que ele está tentando acessar existe.
import { AccountsController } from '../controller/AccountsController';
import { UsersControllers } from '../controller/UsersController';
import { Users } from '../entity/Users';

//exportando rota para utilizar no server.
export const userRouter = Router();

//instânciando controllers
const userController = new UsersControllers();
const accountController = new AccountsController();
/**
 * Serviço para salvar um novo usuario.
 */

userRouter.post('/', async (req, res) => {
  const { username, password } = req.body; // associação por desestruturação.
  const accountCreated = await accountController.salvar();
  const user = new Users(username, password, accountCreated); // a criação de constructor permitiu fazer dessa mandeira, caso contrario eu teria que fazer user.username = username, e por assim vai!
  const userSave = await userController.salvar(user, accountCreated);
  res.json(userSave);
});
