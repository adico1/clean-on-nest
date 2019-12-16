import { RefreshAccessTokenAccountsResponseMessage } from './refresh-access-token.accounts.response.message';
import { IRequestMessage } from '../../common/interfaces/request-message.interface';
import { InetLocation } from '@btcp/bootcamp-entities';

export class RefreshAccessTokenAccountsRequestMessage 
implements IRequestMessage {
  public refreshToken: string;
  public inetLocation: InetLocation
}
