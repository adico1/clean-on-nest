import { GetAllAccountsResponseMessage } from './get-all.accounts.response.message';
import { IRequestMessage } from '../../common/interfaces/request-message.interface';

export class GetAllAccountsRequestMessage 
implements IRequestMessage {
  _accountId: string;

  set accountId(accountId: string) {
    this._accountId = accountId;
  }
  get accountId(): string {
    return this._accountId;
  }
}
