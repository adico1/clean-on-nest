import * as _ from 'lodash';
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { AccountSeed } from '../accounts/seed/accounts.seed';

async function run() {
  console.log('Beginning dbseed task.');

  //const seedUser: AccountDto = new AccountDto();
  //seedUser.id = 'seed-user';

  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true
  };

  const connection = await createConnection(opt as ConnectionOptions);
  console.log('PG connected.');

  const accountSeed = new AccountSeed(connection);
  await accountSeed.run();
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));
