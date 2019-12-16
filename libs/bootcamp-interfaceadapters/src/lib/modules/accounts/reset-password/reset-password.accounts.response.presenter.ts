import { IPresenter } from '../../../common/presenter.interface';
import { ResetPasswordAccountsResponseMessage } from '@btcp/bootcamp-blogic';
import { ResetPasswordAccountsViewModel } from './reset-password.accounts.viewmodel';
import { ResetPasswordAccountsOutput } from './reset-password.accounts.output';
import { Messages } from '@btcp/bootcamp-entities';

const validationError = Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX;

export class ResetPasswordAccountsResponsePresenter implements IPresenter {
  public handle(response: ResetPasswordAccountsResponseMessage): ResetPasswordAccountsOutput {

    switch(response.validationResult.isValid) {
      case true:
        return new ResetPasswordAccountsOutput(
          null, 
          new ResetPasswordAccountsViewModel(response.response));
      case false:
        let errorMsg = validationError;

        response.validationResult.errors.forEach( error => {
          errorMsg += error;
        });
        return new ResetPasswordAccountsOutput(errorMsg, null);
    }
    return null;
  }
}
