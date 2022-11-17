import { Router } from 'express'; //roteia as rotas, informa que tem algo acessando e ve se a rota que ele está tentando acessar existe.

const routerUsuario = Router();

/**
 * Criando uma rota padrão
 */

routerUsuario.get('/usuarios', (req, res) => {
  return res.send('Serviço de usuario');
});
