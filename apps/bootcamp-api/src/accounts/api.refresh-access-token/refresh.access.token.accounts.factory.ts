import { NestView, RefreshAccessTokenAccountsResponsePresenter, 
  RefreshAccessTokenAccountLogicController, 
  AuthDependencies,
  VerificationGeneratorDependencies} from '@btcp/bootcamp-interfaceadapters';
import { RefreshAccessTokenAccountsRequestMessageValidator, RefreshAccessTokenAccountsInteractor,
  RefreshAccessTokenAccountsRequestMessage, 
  RefreshTokenService,
  AuthService} from '@btcp/bootcamp-blogic';
import { Factory } from '../common/factory';
import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { RefreshAccessTokenDto } from '../dto/refresh-access-token.dto';
import { InetLocationDto } from '../dto/inet-location.dto';
import { IControllerFactory } from '../../shared/interfaces/controller-factory.interface';

export class RefreshAccessTokenAccountFactory 
extends IControllerFactory<RefreshAccessTokenAccountLogicController> {
  public create(): RefreshAccessTokenAccountLogicController {
    const view = new NestView(this._res);
    const validator = new RefreshAccessTokenAccountsRequestMessageValidator();
    const repository = Factory.createAccountRepository(this._connection);
    const refreshTokenRepository = 
      Factory.createRefreshTokenRepository(this._connection);
    const refreshTokenService = new RefreshTokenService(refreshTokenRepository);
    const authDependencies = new AuthDependencies();
    const verificationGenerator = new VerificationGeneratorDependencies();
    const auth = new AuthService(repository, authDependencies, verificationGenerator, refreshTokenService);

    const interactor = new RefreshAccessTokenAccountsInteractor(validator, repository, auth);
    const presenter = new RefreshAccessTokenAccountsResponsePresenter();
    return new RefreshAccessTokenAccountLogicController(interactor, presenter, view);
  }
}