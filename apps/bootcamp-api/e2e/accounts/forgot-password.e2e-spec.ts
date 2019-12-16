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
import { TestStatics } from '../common/test-statics';
import { AccountEntity, ForgotPasswordEntity } from '@btcp/bootcamp-data';
import { Consts, Messages } from '@btcp/bootcamp-entities';
import { Factory } from '../../src/accounts/common/factory';
import { getConnection } from 'typeorm';

const mainModuleName = 'Accounts';
const mainFeatureName = 'Forgot Password';
const apiUrl = '/accounts/auth/forgot-password';
const apiMethod = 'POST'
const apiCommand = `${apiMethod} ${apiUrl}`
const apiName = 'forgot password';
const itPrefix = `${apiCommand} | (${apiName} &`;

const apiNameForgotPasswordVerify = 'forgot password verify';
const apiUrlForgotPasswordVerify = '/accounts/auth/forgot-password-verify';
const apiCommandForgotPasswordVerify = `${apiMethod} ${apiUrlForgotPasswordVerify}`;
const itPrefixForgotPasswordVerify = `${apiCommandForgotPasswordVerify} | (${apiNameForgotPasswordVerify} &`;

const apiNameResetPassowrd = 'reset password';
const apiUrlResetPassowrd = '/accounts/auth/reset-password';
const apiCommandResetPassowrd = `${apiMethod} ${apiUrlResetPassowrd}`
const itPrefixResetPassowrd = `${apiCommandResetPassowrd} | (${apiNameResetPassowrd} &`

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

  let verificationCode = null;

  it(`${itPrefix} email exists)`, async () => {
    const repository = Factory.createForgotPasswordRepository(getConnection());
    
    return await server
      .post(apiUrl)
      .send({email: TestStatics.forgotPasswordUserEmail})
      .expect(Consts.HttpStatus.code.OK)
      .expect(async res => {
        const forgotPassword = await repository.getByQuery({email: TestStatics.forgotPasswordUserEmail});
        if (!forgotPassword) {
          throw Error('should create row in ForgotPassword in db with provided email');
        }
        if (forgotPassword.firstUsed || forgotPassword.finalUsed) {
          throw Error('forgotPassword inserted row should have firstUsed and lastUsed set to false');
        }
        // TODO: can also check that 
        // 1) ip, country and  browser are registered, 
        // 2) expiration time is 1 day
        // 3) verification is UUID

        verificationCode = forgotPassword.verification
      })
      .expect({"email":TestStatics.forgotPasswordUserEmail,"message":"verification sent."});
  });

  it(`${itPrefix} email does not exists)`, async () => {
    const repository = Factory.createForgotPasswordRepository(getConnection());
    
    return await server
      .post(apiUrl)
      .send({email: TestStatics.nonExistingUserEmail})
      .expect(Consts.HttpStatus.code.OK)
      .expect(async res => {
        const forgotPassword = await repository.getByQuery({email: TestStatics.nonExistingUserEmail});
        if (forgotPassword) {
          throw Error('should have not created a row in ForgotPassword in db with provided email');
        }
      })
      .expect({"email": TestStatics.nonExistingUserEmail,"message": "verification sent."});
  });

  it(`${itPrefixForgotPasswordVerify} verification code exists)`, async () => {
    const repository = Factory.createForgotPasswordRepository(getConnection());
    
    return await server
      .post(apiUrlForgotPasswordVerify)
      .send({verification: verificationCode})
      .expect(Consts.HttpStatus.code.OK)
      .expect(async res => {
        const forgotPassword = await repository.getByQuery({email: TestStatics.forgotPasswordUserEmail});
        if (!forgotPassword) {
          throw Error('should create row in ForgotPassword in db with provided email');
        }

        if (!(forgotPassword.firstUsed && !forgotPassword.finalUsed)) {
          throw Error('forgotPassword inserted row should have firstUsed=true and lastUsed=false');
        }
      })
      .expect({"email":TestStatics.forgotPasswordUserEmail,"message":"now reset your password."});
  });

  it(`${itPrefixForgotPasswordVerify} verification code does not exists)`, async () => {
    return await server
      .post(apiUrlForgotPasswordVerify)
      .send({verification: 'non-existing-verification-code'})
      .expect(Consts.HttpStatus.code.BAD_REQUEST)
      .expect({statusCode: Consts.HttpStatus.code.BAD_REQUEST,
        error: Consts.HttpStatus.message.BAD_REQUEST,
        message: 'error: verification code invalid'});
  });


  it(`${itPrefixResetPassowrd} email exists, bad password)`, async () => {
    const repository = Factory.createForgotPasswordRepository(getConnection());
    
    return await server
      .post(apiUrlResetPassowrd)
      .send({email: TestStatics.forgotPasswordUserEmail, password: '0'})
      .expect(Consts.HttpStatus.code.BAD_REQUEST)
      .expect(async res => {
        const forgotPassword = await repository.getByQuery({email: TestStatics.forgotPasswordUserEmail});
        if (!forgotPassword) {
          throw Error('should exist a row in ForgotPassword in db with provided email');
        }

        if (forgotPassword.finalUsed) {
          throw Error('reset password should fail and not chnage firstUsed to true');
        }
      })
      .expect({statusCode: Consts.HttpStatus.code.BAD_REQUEST,
        error: Consts.HttpStatus.message.BAD_REQUEST,
        message: 'error: password invalid'});
  });

  it(`${itPrefixResetPassowrd} email exists, password ok)`, async () => {
    const repository = Factory.createForgotPasswordRepository(getConnection());
    
    return await server
      .post(apiUrlResetPassowrd)
      .send({email: TestStatics.forgotPasswordUserEmail, password: '0123456789'})
      .expect(Consts.HttpStatus.code.OK)
      .expect(async res => {
        const forgotPassword = await repository.getByQuery({email: TestStatics.forgotPasswordUserEmail});
        console.log('forgotPassword:')
        console.dir(forgotPassword);

        // TODO: make sure password changed
        // TODO: make sure ForgotPassword row deleted
        if (!forgotPassword) {
          throw Error('should create row in ForgotPassword in db with provided email');
        }

        if (!(forgotPassword.firstUsed && forgotPassword.finalUsed)) {
          throw Error('forgotPassword inserted row should have firstUsed and lastUsed set to true');
        }
      })
      .expect({
        "email":TestStatics.forgotPasswordUserEmail,
        "message":"password successfully changed."});
  });

  it(`${itPrefixResetPassowrd} not existing email)`, async () => {
    return await server
      .post(apiUrlResetPassowrd)
      .send({email: TestStatics.nonExistingUserEmail, password: '0123456789'})
      .expect(Consts.HttpStatus.code.BAD_REQUEST)
      .expect({statusCode: Consts.HttpStatus.code.BAD_REQUEST,
        error: Consts.HttpStatus.message.BAD_REQUEST,
        message: 'error: Bad Request'});
  });

  it(`${itPrefixResetPassowrd} existing email, not in the process of reset)`, async () => {
    return await server
      .post(apiUrlResetPassowrd)
      .send({email: TestStatics.userEmail, password: 'abcdefghijklmnop'})
      .expect(Consts.HttpStatus.code.BAD_REQUEST)
      .expect({statusCode: Consts.HttpStatus.code.BAD_REQUEST,
        error: Consts.HttpStatus.message.BAD_REQUEST,
        message: 'error: Bad Request'});
  });
});
