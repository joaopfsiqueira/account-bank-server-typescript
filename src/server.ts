import { app } from './app';
import { userRouter } from './routes/users.routes';

app.use('/usuarios', userRouter);

app.listen(process.env.PORT, () =>
  console.log(`App ouvindo na porta ${process.env.PORT}`)
);
