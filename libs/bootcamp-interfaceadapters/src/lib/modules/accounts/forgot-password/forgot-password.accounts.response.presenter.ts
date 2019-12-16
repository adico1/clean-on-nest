import { IPresenter } from '../../../common/presenter.interface';
import { ForgotPasswordAccountsResponseMessage } from '@btcp/bootcamp-blogic';
import { ForgotPasswordAccountsViewModel } from './forgot-password.accounts.viewmodel';
import { ForgotPasswordAccountsOutput } from './forgot-password.accounts.output';
import { Messages } from '@btcp/bootcamp-entities';

const validationError = Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX;

export class ForgotPasswordAccountsResponsePresenter implements IPresenter {
  public handle(response: ForgotPasswordAccountsResponseMessage): ForgotPasswordAccountsOutput {

    switch(response.validationResult.isValid) {
      case true:
        return new ForgotPasswordAccountsOutput(
          null, 
          new ForgotPasswordAccountsViewModel(response.response));
      case false:
        let errorMsg = validationError;

        response.validationResult.errors.forEach( error => {
          errorMsg += error;
        });
        return new ForgotPasswordAccountsOutput(errorMsg, null);
    }
    return null;
  }
}
