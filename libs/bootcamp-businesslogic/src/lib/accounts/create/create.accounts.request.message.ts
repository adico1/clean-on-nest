import { CreateAccountsResponseMessage } from './create.accounts.response.message';
import { IRequestMessage } from '../../common/interfaces/request-message.interface';

export class CreateAccountsRequestMessage 
implements IRequestMessage {
  public firstName: string;
  public lastName: string;
  public password: string;
  public passwordRepeat: string;
  public email: string;
}
