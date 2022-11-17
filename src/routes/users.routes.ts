import { Router } from 'express'; //roteia as rotas, informa que tem algo acessando e ve se a rota que ele está tentando acessar existe.

export const routerUsuario = Router();

/**
 * Criando uma rota padrão
 */

routerUsuario.get('/', (req, res) => {
  res.send('Serviço de usuario');
});
