import { IRepository, IService, ForgotPassword, IVerificationGeneratorDependencies, InetLocation, VerifyUuid, ResetPassword } from '@btcp/bootcamp-entities';
import { BadRequestException } from './exceptions/bad-request.exception';
import { ForgotPasswordRepository } from '@btcp/bootcamp-data';

export class ForgotPasswordService implements IService {
  HOURS_TO_VERIFY = 4;

  private readonly _repository: IRepository<string, ForgotPassword>;
  private readonly _forgotPasswordDependencies: IVerificationGeneratorDependencies;

  constructor(
    repository,
    forgotPasswordDependencies: IVerificationGeneratorDependencies) {

      this._repository = repository;
      this._forgotPasswordDependencies = forgotPasswordDependencies;
  }

  async save(refreshToken: ForgotPassword) {
    return await this._repository.save(refreshToken); 
  }

  public async saveForgotPassword(email:string, inetLoc: InetLocation) {
    const expires = this._forgotPasswordDependencies.getExpirationDate(this.HOURS_TO_VERIFY);
    const a = {
      email: email,
      verification: this._forgotPasswordDependencies.createVerificationCode(),
      expires: expires,
      ip: inetLoc.ip,
      browser: inetLoc.browser,
      country: inetLoc.country,
    };
    const forgotPassword = await this._repository.create(a);

    await this._repository.save(forgotPassword);
  }

  public async findForgotPasswordByUuid(verification:string): Promise<ForgotPassword> {
      const forgotPassword = await (this._repository as ForgotPasswordRepository)
        .getByVerification(verification);

      if (!forgotPassword) {
          return null;
      }

      return forgotPassword;
  }

  public async setForgotPasswordFirstUsed(forgotPassword: ForgotPassword, inetLoc: InetLocation) {
      forgotPassword.firstUsed = true;
      forgotPassword.ipChanged = inetLoc.ip;
      forgotPassword.browserChanged = inetLoc.browser;
      forgotPassword.countryChanged = inetLoc.country;
      await this._repository.save(forgotPassword);
  }

  public async findForgotPasswordByEmail(email: string): Promise<ForgotPassword> {
      const forgotPassword = await (this._repository as ForgotPasswordRepository)
        .getByEmail(email);
      
      if (!forgotPassword) {
          throw new BadRequestException('Bad request.');
      }
      return forgotPassword;
  }

  public async setForgotPasswordFinalUsed(forgotPassword: ForgotPassword) {
      forgotPassword.finalUsed = true;
      await this._repository.save(forgotPassword);
  }

  public async resetUserPassword(email: string, password: string) {
      const user = await this._repository.getByQuery({
          email: email,
          verified: true,
      });
      user.pw = password;
      await this._repository.save(user);
  }
}
