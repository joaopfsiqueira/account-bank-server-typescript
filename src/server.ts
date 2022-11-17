import { app } from './app';
import { routerUsuario } from './routes/users.routes';

app.use('/usuarios', routerUsuario);
app.use('/', (req, res) => res.send('Diretorio padrao'));

app.listen(process.env.PORT, () =>
  console.log(`App ouvindo na porta ${process.env.PORT}`)
);
