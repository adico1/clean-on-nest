import { Factory } from '../accounts/common/factory';
import { RefreshTokenService, AuthService } from '@btcp/bootcamp-blogic';
import { AuthDependencies, VerificationGeneratorDependencies } from '@btcp/bootcamp-interfaceadapters';
import { IControllerFactory } from '../shared/interfaces/controller-factory.interface';

export class AuthFactory extends IControllerFactory<AuthService> {
  public create(): AuthService {
    const repository = Factory.createAccountRepository(this._connection);
    const refreshTokenRepository = 
      Factory.createRefreshTokenRepository(this._connection);
    const refreshTokenService = new RefreshTokenService(refreshTokenRepository);
    const authDependencies = new AuthDependencies();
    const verificationGenerator = new VerificationGeneratorDependencies();
    return new AuthService(repository,authDependencies, verificationGenerator, refreshTokenService); 
  }
}