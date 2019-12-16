import { IPresenter } from '../../../common/presenter.interface';
import { ForgotPasswordVerifyAccountsResponseMessage } from '@btcp/bootcamp-blogic';
import { ForgotPasswordVerifyAccountsViewModel } from './forgot-password-verify.accounts.viewmodel';
import { ForgotPasswordVerifyAccountsOutput } from './forgot-password-verify.accounts.output';
import { Messages } from '@btcp/bootcamp-entities';

const validationError = Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX;

export class ForgotPasswordVerifyAccountsResponsePresenter implements IPresenter {
  public handle(response: ForgotPasswordVerifyAccountsResponseMessage): ForgotPasswordVerifyAccountsOutput {

    switch(response.validationResult.isValid) {
      case true:
        return new ForgotPasswordVerifyAccountsOutput(
          null, 
          new ForgotPasswordVerifyAccountsViewModel(response.response));
      case false:
        let errorMsg = validationError;

        response.validationResult.errors.forEach( error => {
          errorMsg += error;
        });
        return new ForgotPasswordVerifyAccountsOutput(errorMsg, null);
    }
    return null;
  }
}
