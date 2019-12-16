import { Controller, Inject } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

@Controller()
export class DatabaseService {
    constructor(@Inject('Connection') public connection: Connection) { }

    async getRepository<T>(entity): Promise<Repository<T>> {
        return this.connection.getRepository(entity);
    }
}
