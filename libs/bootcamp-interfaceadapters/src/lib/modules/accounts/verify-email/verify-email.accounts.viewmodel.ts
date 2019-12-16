import { LoginInfo } from '@btcp/bootcamp-entities';
import { IViewModel } from '../../../common/view-model.interface';

export class VerifyEmailAccountsViewModel implements IViewModel {
  public id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public refreshToken: string;
  public accessToken: string;

  constructor( loginInfo: LoginInfo ) {
    this.id = loginInfo.id;
    this.firstName = loginInfo.firstName;
    this.lastName = loginInfo.lastName;
    this.email = loginInfo.email;
    this.refreshToken = loginInfo.refreshToken;
    this.accessToken = loginInfo.accessToken;
  }

}