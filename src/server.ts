import { app } from './app';
import { UserRouter } from './routes/Users.routes';
import { TransactionRouter } from './routes/Transactions.routes';
import { AuthRouter } from './routes/Auth.routes';

app.use('/users', UserRouter);
app.use('/transactions', TransactionRouter);
app.use('/auth', AuthRouter);

app.listen(process.env.PORT, () =>
  console.log(`App ouvindo na porta ${process.env.PORT}`)
);
