import { app } from './app';

app.listen(process.env.PORT, () =>
  console.log(`App ouvindo na porta ${process.env.PORT}`)
);
