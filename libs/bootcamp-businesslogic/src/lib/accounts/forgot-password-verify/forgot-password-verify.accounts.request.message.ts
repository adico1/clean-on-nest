import { ForgotPasswordVerifyAccountsResponseMessage } from './forgot-password-verify.accounts.response.message';
import { IRequestMessage } from '../../common/interfaces/request-message.interface';
import { InetLocation } from '@btcp/bootcamp-entities';

export class ForgotPasswordVerifyAccountsRequestMessage 
implements IRequestMessage {
  public verification: string;
  public inetLocation: InetLocation
}
