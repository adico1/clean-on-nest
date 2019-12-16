import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from '../config/config.service';
import { DecksModule } from '../decks/decks.module';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthModule } from '../auth/auth.module';
//import { AuthService } from '../auth/auth.service';
import { AccountEntity, 
  ForgotPasswordEntity, 
  RefreshTokenEntity } from '@btcp/bootcamp-data';

@Module({
  imports: [
    MorganModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([AccountEntity, ForgotPasswordEntity, RefreshTokenEntity]),
    DecksModule,
    AccountsModule,
    AuthModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
    AppService
  ],
})
export class AppModule {}
