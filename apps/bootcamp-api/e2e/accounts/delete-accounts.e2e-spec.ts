import * as path from 'path';
require('dotenv').config({path: path.resolve(process.cwd(), 'apps/bootcamp-api/.env')});

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AccountsModule } from '../../src/accounts/accounts.module';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { adminLogin, userLogin } from './accounts.e2e-helper';

import * as passport from 'passport';
import { AccountEntity, ForgotPasswordEntity } from '@btcp/bootcamp-data';
import { TestStatics } from '../common/test-statics';
import { Consts } from '@btcp/bootcamp-entities';

const mainModuleName = 'Accounts';
const mainFeatureName = 'Delete';
const apiUrl = '/accounts';
const getByEmailApiUrl = '/accounts/email'
const apiMethod = 'DELETE'
const apiCommand = `/${apiMethod} ${apiUrl}`
const apiName = 'delete account';
const itPrefix = `${apiCommand} | (${apiName} &`

jest.setTimeout(60000);

describe(`${mainFeatureName} ${mainModuleName}`, () => {
  let app: INestApplication;

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
      providers: [
      ]
    })
    .compile();

    app = module.createNestApplication();
    app.use(passport.initialize());
    await app.init();

    return true;
  });
  
  afterAll(async done => {
    await app.close();

    done();
  });

  let deleteAccountId = null;

  it(`${itPrefix} user: anonymous`, async () => {
    const httpServer = app.getHttpServer();

    await request(httpServer)
      .get(`${getByEmailApiUrl}/${encodeURIComponent(TestStatics.deleteUserEmail)}`)
      .expect(function(res) {
        deleteAccountId = res.body.id;
      })

    return await request(httpServer)
      .delete(`${apiUrl}/${deleteAccountId}`)
      .expect(Consts.HttpStatus.code.UNAUTHORIZED)
      .expect(Consts.Http.UNAUTHORIZED);
  });
  
  let authToken: string = null;

  it(`${itPrefix} user: user`, async () => {
    const httpServer = app.getHttpServer();

    authToken = await userLogin(httpServer);

    await request(httpServer)
      .get(`${getByEmailApiUrl}/${encodeURIComponent(TestStatics.deleteUserEmail)}`)
      .expect(function(res) {
        deleteAccountId = res.body.id;
      })

    return await request(httpServer)
      .delete(`${apiUrl}/${deleteAccountId}`)
      .set('Authorization', 'bearer ' + authToken)
      .expect(Consts.HttpStatus.code.FORBIDDEN)
      .expect(Consts.Http.FORBIDDENpMSG)
  });

  // LAST TEST BECAUSE IT ACTUALLY DELETES - MUST BE THE LAST TEST
  // OR TO MAKE THIS TEST UNDEPENDANT:
  // TODO: ADD MORE EMAILS TO DELETE IN SEED
  it(`${itPrefix} user: admin`, async () => {
    const httpServer = app.getHttpServer();

    authToken = await adminLogin(httpServer);

    await request(httpServer)
      .get(`${getByEmailApiUrl}/${encodeURIComponent(TestStatics.deleteUserEmail)}`)
      .expect(function(res) {
        deleteAccountId = res.body.id;
      })

    return await request(httpServer)
      .delete(`${apiUrl}/${deleteAccountId}`)
      .set('Authorization', 'bearer ' + authToken)
      .expect(Consts.HttpStatus.code.OK)
      .expect({})
  });
});