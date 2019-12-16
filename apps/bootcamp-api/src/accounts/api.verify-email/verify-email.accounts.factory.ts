import { NestView, VerifyEmailAccountsResponsePresenter, 
  VerifyEmailAccountLogicController, 
  AuthDependencies,
  VerificationGeneratorDependencies} from '@btcp/bootcamp-interfaceadapters';
import { 
  VerifyEmailAccountsRequestMessageValidator, 
  VerifyEmailAccountsInteractor,
  AuthService, RefreshTokenService } from '@btcp/bootcamp-blogic';
import { IControllerFactory } from '../../shared/interfaces/controller-factory.interface';
import { Factory } from '../common/factory';

export class VerifyEmailAccountFactory extends IControllerFactory<VerifyEmailAccountLogicController> {
  public create(): VerifyEmailAccountLogicController  {
    const view = new NestView(this._res);
    const validator = new VerifyEmailAccountsRequestMessageValidator();
    const repository = Factory.createAccountRepository(this._connection);
    const refreshTokenRepository = 
      Factory.createRefreshTokenRepository(this._connection);
    const refreshTokenService = new RefreshTokenService(refreshTokenRepository);
    const authDependencies = new AuthDependencies();
    const verificationGenerator = new VerificationGeneratorDependencies();
    const auth = new AuthService(repository, authDependencies, verificationGenerator, refreshTokenService);
    const interactor = new VerifyEmailAccountsInteractor(validator, repository, auth);
    const presenter = new VerifyEmailAccountsResponsePresenter();
    return new VerifyEmailAccountLogicController(interactor, presenter, view);
  }
}