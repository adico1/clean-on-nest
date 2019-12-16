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

export class RefreshAccessTokenAccountFacade 
extends IControllerFacede<RefreshAccessTokenAccountLogicController> {
  public async exec(refreshAccessTokenAccountDto: RefreshAccessTokenDto) {

    const controller = this._factory.create();
    await controller.refreshAccessToken(RefreshAccessTokenDto.toMessage(refreshAccessTokenAccountDto));

  }
}
