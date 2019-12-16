export interface IVerificationGeneratorDependencies {
  createVerificationCode(): string;
  getExpirationDate(hoursToVerify: number): Date;
}