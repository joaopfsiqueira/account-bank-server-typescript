import { app } from './app';
import { UserRouter } from './routes/Users.routes';
import { TransactionRouter } from './routes/Transactions.routes';

app.use('/usuarios', UserRouter);
app.use('/transactions', TransactionRouter);

app.listen(process.env.PORT, () =>
  console.log(`App ouvindo na porta ${process.env.PORT}`)
);
