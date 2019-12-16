import { VerifyEmailAccountsResponseMessage } from './verify-email.accounts.response.message';
import { IRequestMessage } from '../../common/interfaces/request-message.interface';
import { InetLocation } from '@btcp/bootcamp-entities';

export class VerifyEmailAccountsRequestMessage 
implements IRequestMessage {
  public verification: string;
  public inetLocation: InetLocation}
