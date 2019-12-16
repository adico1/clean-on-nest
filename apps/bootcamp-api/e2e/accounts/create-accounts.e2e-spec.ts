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
import { Consts, Messages } from '@btcp/bootcamp-entities';
import { Factory } from '../../src/accounts/common/factory';
import { getConnection } from 'typeorm';
import { isRefreshToken, isAccessToken } from './accounts.e2e-helper';

const mainModuleName = 'Accounts';
const mainFeatureName = 'Create';
const apiUrl = '/accounts';
const apiMethod = 'POST'
const apiCommand = `/${apiMethod} ${apiUrl}`
const apiName = 'create account';
const itPrefix = `${apiCommand} | (${apiName} &`

const apiUrlVerifyEmail = '/accounts/auth/verify-email';
const apiCommandVerifyEmail = `/${apiMethod} ${apiUrlVerifyEmail}`
const apiNameVerifyEmail = 'verify email';
const itPrefixVerifyEmail = `${apiCommandVerifyEmail} | (${apiNameVerifyEmail} &`

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
    }

    done();
  });

  let createdAccountId = null;
  

  it(`${itPrefix} anonymous & success)`, async () => {
    // const httpServer = app.getHttpServer();

    return await server
      .post('/accounts')
      .set('Accept', 'application/json')
      .send({
        "firstName": "adi", 
        "lastName": "cohen", 
        "email": TestStatics.createUserEmail, 
        "password": "pw1508-1", 
        "passwordRepeat": "pw1508-1"
      })
      .expect('Content-Type', /json/)
      .expect(Consts.HttpStatus.code.OK)
      .expect(function(res) {
        createdAccountId = res.body.id;
        delete(res.body.id);
      })
      .expect({ firstName: 'adi',
        email: TestStatics.createUserEmail,
        lastName: 'cohen',
        roles: [ 'user' ] });
  });
  
  it(`${itPrefix} anonymous & fail: duplicate email)`, async () => {
    // const httpServer = app.getHttpServer();

    return await server
      .post('/accounts')
      .set('Accept', 'application/json')
      .send({
        "firstName": "adi", 
        "lastName": "cohen", 
        "email": TestStatics.createUserEmail, 
        "password": "pw1508-1", 
        "passwordRepeat": "pw1508-1"
      })
      .expect('Content-Type', /json/)
      .expect(Consts.HttpStatus.code.BAD_REQUEST)
      .expect({statusCode: Consts.HttpStatus.code.BAD_REQUEST,
        error: Consts.HttpStatus.message.BAD_REQUEST,
        message: `${Messages.EMAIL_MUST_BE_UNIQUE}`});
  });

  it(`${itPrefix} anonymous & fail: validation)`, async () => {
    // const httpServer = app.getHttpServer();

    return await server
      .post('/accounts')
      .set('Accept', 'application/json')
      .send({
        "firstName": "a", 
        "lastName": "cohen", 
        "email": "test1508-1@gmail.com", 
        "password": "pw1508-1", 
        "passwordRepeat": "pw1508-1"
      })
      .expect('Content-Type', /json/)
      .expect(Consts.HttpStatus.code.BAD_REQUEST)
      .expect({
        "statusCode": Consts.HttpStatus.code.BAD_REQUEST,
        "error": Consts.HttpStatus.message.BAD_REQUEST,
        "message": `${Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX}${Messages.FIRST_NAME_INVALID}`
      });
  });

  it(`${itPrefix} anonymous & fail: multiple validation)`, async () => {
    // const httpServer = app.getHttpServer();

    return await server
      .post('/accounts')
      .set('Accept', 'application/json')
      .send({
        "firstName": "a", 
        "lastName": "c", 
        "email": "test1508-1@gmail.com", 
        "password": "pw1508-1", 
        "passwordRepeat": ""
      })
      .expect('Content-Type', /json/)
      .expect(Consts.HttpStatus.code.BAD_REQUEST)
      .expect({ statusCode: Consts.HttpStatus.code.BAD_REQUEST,
        error: Consts.HttpStatus.message.BAD_REQUEST,
        message:
         `${Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX}${Messages.FIRST_NAME_INVALID} | ${Messages.LAST_NAME_INVALID} | ${Messages.PASSWORD_MATCH_INVALID}` });
  });

  it(`${itPrefix} anonymous & fail: invalid email address)`, async () => {
    // const httpServer = app.getHttpServer();

    return await server
      .post('/accounts')
      .set('Accept', 'application/json')
      .send({
        "firstName": "adi", 
        "lastName": "cohen", 
        "email": 'test1508-1@gmail.com"', 
        "password": "pw1508-1", 
        "passwordRepeat": "pw1508-1"
      })
      .expect('Content-Type', /json/)
      .expect(Consts.HttpStatus.code.BAD_REQUEST)
      .expect({ statusCode: Consts.HttpStatus.code.BAD_REQUEST,
        error: Consts.HttpStatus.message.BAD_REQUEST,
        message:
         `${Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX}${Messages.EMAIL_INVALID}` });
  });

  it(`${itPrefix} anonymous & fail: invalid email address)`, async () => {
    // const httpServer = app.getHttpServer();

    const repository = Factory.createAccountRepository(getConnection());
    const user = await repository.getByQuery({email: TestStatics.createUserEmail});
    return await server
      .post(apiUrlVerifyEmail)
      .set('Accept', 'application/json')
      .send({
        "verification": user.verification 
      })
      .expect('Content-Type', /json/)
      .expect(Consts.HttpStatus.code.OK)
      .expect((res)=>{
        const response = res.body;

        if (!(
          'firstName' in response && 
          'lastName' in response &&
          'email' in response &&
          'accessToken' in response && 
          'refreshToken' in response &&
          Object.keys(response).length === 5)) {
              
            throw new Error("response items format should have 5 properties: firstName, lastname, email, accessToken, refreshToken");
        }

        if (!isRefreshToken(response.refreshToken)) {
          throw new Error("response item refresh token invalid");
        }
    
        if (!isAccessToken(response.accessToken)) {
          throw new Error("response item access token invalid");
        }

        // TODO: read the account again from DB and test that all verification fields are updated properly
        // TODO: negetive test - non existing verification code
      });
  });
});