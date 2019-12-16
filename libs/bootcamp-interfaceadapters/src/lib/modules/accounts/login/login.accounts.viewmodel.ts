import { LoginToken } from '@btcp/bootcamp-entities';
import { IViewModel } from '../../../common/view-model.interface';

export class LoginAccountsViewModel implements IViewModel {
  public refreshToken: string;
  public accessToken: string;

  constructor( loginToken: LoginToken ) {
    this.refreshToken = loginToken.refresh_token;
    this.accessToken = loginToken.access_token;
  }

}