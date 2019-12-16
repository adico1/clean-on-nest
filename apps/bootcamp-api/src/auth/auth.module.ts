import * as path from 'path';
require('dotenv').config({path: path.resolve(process.cwd(), 'apps/bootcamp-api/.env')});

import { Module } from '@nestjs/common';
//import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity, RefreshTokenEntity } from '@btcp/bootcamp-data';
import { SessionSerializer } from './session.serializer';

//console.log('secret:', process.env.JWT_SECRET);
//console.log('expiration:', process.env.JWT_EXPIRATION);

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, RefreshTokenEntity]),
    PassportModule,
    // PassportModule.register({ 
    //   defaultStrategy: 'jwt'
    // }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRATION}s` },
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, RefreshTokenService, SessionSerializer],
  exports: [RefreshTokenService],
})
export class AuthModule {}
