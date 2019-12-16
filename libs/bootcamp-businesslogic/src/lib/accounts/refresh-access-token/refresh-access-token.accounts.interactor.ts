import { RefreshAccessTokenAccountsRequestMessage } from './refresh-access-token.accounts.request.message';
import { RefreshAccessTokenAccountsResponseMessage } from './refresh-access-token.accounts.response.message';
import { IRequestHandler } from '../../common/interfaces/request-handler.interface';
import { IValidator } from '../../common/interfaces/validator.interface';
import { Account, IRepository, LoggedInUser, Messages, Consts } from '@btcp/bootcamp-entities';
import { RefreshAccessTokenAccountsValidationResult } from './refresh-access-token.accounts.validation-result';
import { AuthService } from '../../common';
import { BadRequestException } from '../../common/exceptions/bad-request.exception';
import { UnauthorizedException } from '@nestjs/common';

export class RefreshAccessTokenAccountsInteractor 
implements IRequestHandler<RefreshAccessTokenAccountsRequestMessage, RefreshAccessTokenAccountsResponseMessage> {
  private readonly _repository: IRepository<string, Account>;
  private readonly _validator: IValidator<RefreshAccessTokenAccountsRequestMessage, RefreshAccessTokenAccountsValidationResult>;
  private readonly _auth: AuthService;

  constructor(
    validator: IValidator<RefreshAccessTokenAccountsRequestMessage, RefreshAccessTokenAccountsValidationResult>, 
    repository: IRepository<string, Account>,
    auth: AuthService) {

      this._validator = validator;
      this._repository = repository;
      this._auth = auth;
  }

  public async handle(request: RefreshAccessTokenAccountsRequestMessage): Promise<RefreshAccessTokenAccountsResponseMessage> {
    console.log('refreshAccessToken.accounts.interactor::handle::CP1');

    let validationResult: RefreshAccessTokenAccountsValidationResult = this._validator.validate(request);
    if (!validationResult.isValid) {
      return new RefreshAccessTokenAccountsResponseMessage(validationResult, null);
    }

    let userId = null;
    
    try {
      userId = await this._auth.findRefreshToken(request.refreshToken);      
    } catch(ex) {
      throw new UnauthorizedException(ex.message);
    }

    const user = await this._repository.get(userId);

    if (!user) {
        throw new BadRequestException(Consts.HttpStatus.message.BAD_REQUEST);
    }
    
    const result = await this._auth.createLoginToken(
      LoggedInUser.userToLoggedInUser(user), 
      request.inetLocation
    );

    console.log('refreshAccessToken.accounts.interactor::handle::CP3::result::');
    console.dir(result);

    return new RefreshAccessTokenAccountsResponseMessage(validationResult, result);
    
  }
}
