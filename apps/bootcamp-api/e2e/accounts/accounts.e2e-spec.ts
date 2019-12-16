import * as path from 'path';
require('dotenv').config({path: path.resolve(process.cwd(), 'apps/bootcamp-api/.env')});

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AccountsModule } from '../../src/accounts/accounts.module';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AccountEntity, ForgotPasswordEntity } from '@btcp/bootcamp-data';
import { Consts } from '@btcp/bootcamp-entities';
import { userLogin, adminLogin } from './accounts.e2e-helper';
import * as passport from 'passport';
import { TestStatics } from '../common/test-statics';

const mainModuleName = 'Accounts';
const mainFeatureName = 'GET';
const apiUrl = '/accounts';
const apiMethod = 'GET'
const apiCommand = `/${apiMethod} ${apiUrl}`
const apiName = 'get all accounts';
const itPrefix = `${apiCommand} | (${apiName} &`;

const apiNameByEmail = 'get account by email';
const apiUrlByEmail = '/accounts/email/:email';
const apiCommandByEmail = `/${apiMethod} ${apiUrlByEmail}`;
const itPrefixByEmail = `${apiCommandByEmail} | (${apiNameByEmail} &`;

const apiNameById = 'get account by id';
const apiUrlById = '/accounts/:id';
const apiCommandById = `/${apiMethod} ${apiUrlById}`
const itPrefixById = `${apiCommandById} | (${apiNameById} &`

jest.setTimeout(60000);

describe(`${mainFeatureName} ${mainModuleName}`, () => {
  let app: INestApplication;
  let server = null;
  let httpServer = null;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([AccountEntity, ForgotPasswordEntity]),
        AccountsModule,
        AuthModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRATION },
        }),
      ],
      providers: []
    })
    .compile();

    app = module.createNestApplication();
    app.use(passport.initialize());
    await app.init();

    httpServer = app.getHttpServer();
    server = request(httpServer);

    return true;
  });

  afterAll(async done => {
    await app.close();
    done();
  });

  it(`${itPrefix} user: anonymous)`, async () => {
    return await server
      .get(apiUrl)
      .expect(Consts.HttpStatus.code.UNAUTHORIZED)
      .expect(Consts.Http.UNAUTHORIZED);
  });

  let authToken: string = null;
  
  it(`${itPrefix} user: user)`, async () => {
    authToken = await userLogin(httpServer);

    return await server
      .get(apiUrl)
      .set('Authorization', 'bearer ' + authToken)
      .expect(Consts.HttpStatus.code.FORBIDDEN)
      .expect(Consts.Http.FORBIDDENpMSG);
  });

  it(`${itPrefix} user: admin)`, async () => {
    authToken = await adminLogin(httpServer);

    return await server
      .get(apiUrl)
      .set('Authorization', 'bearer ' + authToken)
      .expect(Consts.HttpStatus.code.OK)
      .expect(function(res) {
        const response = res.body;
        res.body = true;

        if (!Array.isArray(response)) {
          throw new Error("response not array");
        }

        if (response.length < 3) {
          throw new Error("response array should contain more then 3 items by seed");
        }

        if (!(
          'id' in response[0] && 
          'firstName' in response[0] && 
          'email' in response[0] &&
          'lastName' in response[0] &&
          'roles' in response[0] &&
          Object.keys(response[0]).length === 5)) {
              
            throw new Error("response items format should have 4 properties: firstName, lastname, email, roles");
        }
        
        if (!(Array.isArray(response[0].roles))) {
          throw new Error("response items field roles should be array");
        }
      });
  });

  const isItemFormatValid = (item) => {
    if (!(
      'id' in item && 
      'firstName' in item && 
      'email' in item &&
      'lastName' in item &&
      'roles' in item &&
      Object.keys(item).length === 5)) {
          
        throw new Error("response items format should have 4 properties: firstName, lastname, email, roles");
    }
    
    if (!(Array.isArray(item.roles))) {
      throw new Error("response items field roles should be array");
    }
  }
  it(`${itPrefixByEmail} Existing Email)`, async () => {
    return await server
      .get(apiUrlByEmail.replace(':email', encodeURIComponent(TestStatics.userEmail)))
      .expect(Consts.HttpStatus.code.OK)
      .expect(function(res) {
        const response = res.body;
        isItemFormatValid(response);
      });
  });

  // TODO: add negetive test - getByEmail & getById for non existig id, email 
});
