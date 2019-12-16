import { IPresenter } from '../../../common/presenter.interface';
import { LoginAccountsResponseMessage } from '@btcp/bootcamp-blogic';
import { LoginAccountsViewModel } from './login.accounts.viewmodel';
import { Messages } from '@btcp/bootcamp-entities';
import { LoginAccountsOutput } from './login.accounts.output';

const validationError = Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX;

export class LoginAccountsResponsePresenter implements IPresenter {
  public handle(response: LoginAccountsResponseMessage): LoginAccountsOutput {

    switch(response.validationResult.isValid) {
      case true:
        return new LoginAccountsOutput(
          null, 
          new LoginAccountsViewModel(response.response));
      case false:
        let errorMsg = validationError;

        response.validationResult.errors.forEach( error => {
          errorMsg += error;
        });
        return new LoginAccountsOutput(errorMsg, null);
    }
    return null;
  }
}
