import { Module } from '@nestjs/common';
//import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity, 
  RefreshTokenEntity, 
  ForgotPasswordEntity } from '@btcp/bootcamp-data';
import { AccountsController } from './accounts.controller';
import { AuthModule } from '../auth/auth.module';
import { configService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([AccountEntity, ForgotPasswordEntity, RefreshTokenEntity]),
    AuthModule
  ],
  providers: [],
  controllers: [AccountsController],
  exports: []
})
export class AccountsModule {}
