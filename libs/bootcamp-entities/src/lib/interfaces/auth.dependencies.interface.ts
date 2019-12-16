export interface IAuthDependencies {
  getAccessToken(payload: any): string;
  encryptedCompare(attemptPass: string, password: string);
}