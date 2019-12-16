import * as request from 'supertest';
import { TestStatics } from '../common/test-statics';
const testAdminEmail = TestStatics.adminEmail;
const testAdminPassword = TestStatics.adminPassword;
const accountLoginApiUrl = '/accounts/auth/login';

export async function adminLogin(httpServer: any) {
  let authToken = null;

  await request(httpServer)
  .post(accountLoginApiUrl)
  .send({
    email: testAdminEmail, 
    password: testAdminPassword})
  .expect(function(res) {
    // console.dir(res.body);
    authToken = res.body.accessToken;
  });

  return authToken;
} 

export async function userLogin(httpServer: any) {
  let authToken = null;

  await request(httpServer)
    .post(accountLoginApiUrl)
    .send({
      email: TestStatics.userEmail, 
      password: TestStatics.userPassword})
    .expect(function(res) {
      // console.dir(res.body);
      authToken = res.body.accessToken;
    });

  return authToken;
} 

export const isRefreshToken = (refreshToken) => {
  // TODO: isUUID
  return true;
};

export const isAccessToken = (accessToken) => {
  // TODO: unpack access token and match content to expected content
  return true;
};