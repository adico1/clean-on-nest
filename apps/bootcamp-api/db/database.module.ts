import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { configService } from '../src/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  providers: [
    DatabaseService,
  ]
})
export class DatabaseModule {
  constructor() {
  }
}
