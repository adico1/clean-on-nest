import { PutAccountsResponseMessage } from './put.accounts.response.message';
import { IRequestMessage } from '../../common/interfaces/request-message.interface';

export class PutAccountsRequestMessage 
implements IRequestMessage {
  public accountId: string;
  public firstName: string;
  public lastName: string;
}
