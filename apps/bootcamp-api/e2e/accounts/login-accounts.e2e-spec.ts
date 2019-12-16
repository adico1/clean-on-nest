import * as path from 'path';
require('dotenv').config({path: path.resolve(process.cwd(), 'apps/bootcamp-api/.env')});

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AccountsModule } from '../../src/accounts/accounts.module';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

import * as passport from 'passport';
import { AccountEntity, ForgotPasswordEntity } from '@btcp/bootcamp-data';
import { TestStatics } from '../common/test-statics';
import { Messages, Consts } from '@btcp/bootcamp-entities';
import { isRefreshToken, isAccessToken } from './accounts.e2e-helper';

const mainModuleName = 'Accounts';
const mainFeatureName = 'Login';
const apiUrl = '/accounts/auth/login';
const apiMethod = 'POST'
const apiCommand = `/${apiMethod} ${apiUrl}`
const apiName = 'login account';
const itPrefix = `${apiCommand} | (${apiName} &`

jest.setTimeout(60000);

describe(`${mainFeatureName} ${mainModuleName}`, () => {
  let app: INestApplication;
  let server = null;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([AccountEntity, ForgotPasswordEntity]),
        AccountsModule,
        AuthModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: `${process.env.JWT_EXPIRATION}s` },
        }),
      ],
      providers: []
    })
    .compile();

    app = module.createNestApplication();
    app.use(passport.initialize());
    await app.init();

    server = request(app.getHttpServer());

    return true;
  });

  afterAll(async done => {
    if (app) {
      await app.close();
    } else {
      console.log('app not closed');
    }

    done();
  });

  let accountId = null;

  const validTokens = (res) => {
    if( res && res.body && res.body.refreshToken ) {
      if (isRefreshToken(res.body.refreshToken)) {
        res.body.refreshToken = 'refresh_token_found';
      }
    }

    if( res && res.body && res.body.accessToken ) {
      if (isAccessToken(res.body.accessToken)) {
        res.body.accessToken = 'access_token_found';
      }
    }
  };

  const validTokenFormat = {
    "refreshToken":"refresh_token_found",
    "accessToken":"access_token_found"
  };
  it(`${itPrefix} as user & success)`, async () => {
    // const httpServer = app.getHttpServer();

    return await server
      .post(apiUrl)
      .set('Accept', 'application/json')
      .send({
        "email": TestStatics.userEmail, 
        "password": TestStatics.userPassword
      })
      .expect('Content-Type', /json/)
      .expect(Consts.HttpStatus.code.OK)
      .expect(validTokens)
      .expect(validTokenFormat);
  });
  
  it(`${itPrefix} as admin & success)`, async () => {
    return await server
      .post(apiUrl)
      .set('Accept', 'application/json')
      .send({
        "email": TestStatics.adminEmail, 
        "password": TestStatics.adminPassword
      })
      .expect('Content-Type', /json/)
      .expect(Consts.HttpStatus.code.OK)
      .expect(validTokens)
      .expect(validTokenFormat);
  });

  it(`${itPrefix} fail: email not exists)`, async () => {
    // const httpServer = app.getHttpServer();

    return await server
      .post(apiUrl)
      .set('Accept', 'application/json')
      .send({
        "email": TestStatics.nonExistingUserEmail, 
        "password": TestStatics.nonExistingUserPassword
      })
      .expect('Content-Type', /json/)
      .expect(Consts.HttpStatus.code.UNAUTHORIZED)
      .expect({ statusCode: Consts.HttpStatus.code.UNAUTHORIZED,
        error: Consts.HttpStatus.message.UNAUTHORIZED,
        message: Messages.WRONG_EMAIL_PASSWORD });
  });

  it(`${itPrefix} fail: password incorrect)`, async () => {
    // const httpServer = app.getHttpServer();

    return await server
      .post(apiUrl)
      .set('Accept', 'application/json')
      .send({
        "email": TestStatics.userEmail, 
        "password": `${TestStatics.userPassword}zxzxzx`
      })
      .expect('Content-Type', /json/)
      .expect(Consts.HttpStatus.code.UNAUTHORIZED)
      .expect({ statusCode: Consts.HttpStatus.code.UNAUTHORIZED,
        error: Consts.HttpStatus.message.UNAUTHORIZED,
        message: Messages.WRONG_EMAIL_PASSWORD });
  });

  it(`${itPrefix} fail: password incorrect 5 times, block)`, async () => {
    // const httpServer = app.getHttpServer();

    await server
      .post(apiUrl)
      .set('Accept', 'application/json')
      .send({
        "email": TestStatics.userEmail, 
        "password": `${TestStatics.userPassword}zxzxzx`
      });

    await server
      .post(apiUrl)
      .set('Accept', 'application/json')
      .send({
        "email": TestStatics.userEmail, 
        "password": `${TestStatics.userPassword}zxzxzx`
      });
    
    await server
      .post(apiUrl)
      .set('Accept', 'application/json')
      .send({
        "email": TestStatics.userEmail, 
        "password": `${TestStatics.userPassword}zxzxzx`
      });

    return await server
      .post(apiUrl)
      .set('Accept', 'application/json')
      .send({
        "email": TestStatics.userEmail, 
        "password": `${TestStatics.userPassword}zxzxzx`
      })
      .expect('Content-Type', /json/)
      .expect(Consts.HttpStatus.code.CONFLICT)
      .expect({ 
        statusCode: Consts.HttpStatus.code.CONFLICT, 
        error: Consts.HttpStatus.message.CONFLICT, 
        message: Messages.USER_BLOCKED 
      });
  })
})