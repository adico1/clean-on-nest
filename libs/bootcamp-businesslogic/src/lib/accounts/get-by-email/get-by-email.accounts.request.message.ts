import { GetByEmailAccountsResponseMessage } from './get-by-email.accounts.response.message';
import { IRequestMessage } from '../../common/interfaces/request-message.interface';

export class GetByEmailAccountsRequestMessage 
implements IRequestMessage {
  _email: string;

  set email(email: string) {
    this._email = email;
  }
  get email(): string {
    return this._email;
  }
}
