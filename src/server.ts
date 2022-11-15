import { AppDataSource } from './data-source';
import { Accounts } from './entity/Accounts';

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new user into the database...');

    const account = new Accounts();
    account.balance = 100;

    await AppDataSource.manager.save(account);
    console.log('Saved a new user with id: ' + account.id);

    console.log('Loading users from the database...');
    const users = await AppDataSource.manager.find(Accounts);
    console.log('Loaded users: ', users);

    console.log(
      'Here you can setup and run express / fastify / any other framework.'
    );
  })
  .catch((error) => console.log(error));
