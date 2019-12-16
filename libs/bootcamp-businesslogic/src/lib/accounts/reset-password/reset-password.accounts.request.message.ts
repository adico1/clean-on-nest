import { ResetPasswordAccountsResponseMessage } from './reset-password.accounts.response.message';
import { IRequestMessage } from '../../common/interfaces/request-message.interface';

export class ResetPasswordAccountsRequestMessage 
implements IRequestMessage {
  public email: string;
  public password: string;
}
