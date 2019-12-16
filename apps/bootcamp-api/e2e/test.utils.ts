import { Connection, Repository } from 'typeorm';
import { DatabaseService } from '../db/database.service';

import * as Path from 'path';
import * as fs from 'fs';
import { Controller } from '@nestjs/common';

/**
 * This class is used to support database
 * tests with unit tests in NestJS.
 * 
 * This class is inspired by https://github.com/jgordor
 * https://github.com/nestjs/nest/issues/409#issuecomment-364639051
 */
@Controller()
export class TestUtils {
  databaseService: DatabaseService;

  /**
   * Creates an instance of TestUtils
   */
  constructor(databaseService: DatabaseService) {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('ERROR-TEST-UTILS-ONLY-FOR-TESTS');
    }
    this.databaseService = databaseService;
  }

  /**
   * Shutdown the http server
   * and close database connections
   */
  async shutdownServer(server) {
    await server.httpServer.close();
    await this.closeDbConnection();
  }

  /**
   * Closes the database connections
   */
  async closeDbConnection() {
    const connection = (await this.databaseService.connection);
    if (connection.isConnected) {
      await (await this.databaseService.connection).close();
    }
  }

  /**
   * Returns the entites of the database
   */
  async getEntities() {
    const entities = [];
    (await (await this.databaseService.connection).entityMetadatas).forEach(
      x => entities.push({name: x.name, tableName: x.tableName})
    );
    return entities;
  }

  /**
   * Cleans the database and reloads the entries
   */
  async reloadFixtures() {
    const entities = await this.getEntities();
    //await this.cleanAll(entities);
    await this.loadAll(entities);
  }

  /**
   * Cleans all the entities
   */
  async cleanAll(entities) {
    try {
      for (const entity of entities) {
        const repository = await this.databaseService.getRepository(entity.name);
        await repository.query(`DELETE FROM "${entity.tableName}";`);
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }

  /**
   * Insert the data from the src/test/fixtures folder
   */
  async loadAll(entities) {
    try {
      for (const entity of entities) {
        const repository = await this.databaseService.getRepository(entity.name);
        const fixtureFile = Path.join(__dirname, `../test/fixtures/${entity.name}.json`);
        if (fs.existsSync(fixtureFile)) {
          const items = JSON.parse(fs.readFileSync(fixtureFile, 'utf8'));
          await repository
            .createQueryBuilder(entity.name)
            .insert()
            .values(items)
            .execute();
        }
      }
    } catch (error) {
      throw new Error(`ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`);
    }
  }
}
