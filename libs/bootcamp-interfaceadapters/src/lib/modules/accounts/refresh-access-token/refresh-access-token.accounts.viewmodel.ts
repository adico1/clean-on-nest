import { Account, LoginToken } from '@btcp/bootcamp-entities';
import { IViewModel } from '../../../common/view-model.interface';

export class RefreshAccessTokenAccountsViewModel implements IViewModel {
  public accessToken: string;
  public refreshToken: string;

  constructor( loginToken: LoginToken ) {
    this.accessToken = loginToken.access_token;
    this.refreshToken = loginToken.refresh_token;
  }
}