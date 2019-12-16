import { LoginAccountsResponseMessage } from './login.accounts.response.message';
import { IRequestMessage } from '../../common/interfaces/request-message.interface';
import { InetLocation, LoggedInUser } from '@btcp/bootcamp-entities';

export class LoginAccountsRequestMessage 
implements IRequestMessage {
  public loggedInUser: LoggedInUser;
  public inetLocation: InetLocation}
