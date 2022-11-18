import { app } from './app';
import { userRouter } from './routes/users.routes';
// import { transactionRouter } from './routes/transactions.routes';

app.use('/usuarios', userRouter);
// app.use('/transactions', transactionRouter);

app.listen(process.env.PORT, () =>
  console.log(`App ouvindo na porta ${process.env.PORT}`)
);
