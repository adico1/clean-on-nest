import { ForgotPasswordAccountsResponseMessage } from './forgot-password.accounts.response.message';
import { IRequestMessage } from '../../common/interfaces/request-message.interface';
import { InetLocation } from '@btcp/bootcamp-entities';

export class ForgotPasswordAccountsRequestMessage 
implements IRequestMessage {
  public email: string;
  public inetLocation: InetLocation
}
