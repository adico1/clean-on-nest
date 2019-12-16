import { IPresenter } from '../../../common/presenter.interface';
import { VerifyEmailAccountsResponseMessage } from '@btcp/bootcamp-blogic';
import { VerifyEmailAccountsViewModel } from './verify-email.accounts.viewmodel';
import { Messages } from '@btcp/bootcamp-entities';
import { VerifyEmailAccountsOutput } from './verify-email.accounts.output';

const validationError = Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX;

export class VerifyEmailAccountsResponsePresenter implements IPresenter {
  public handle(response: VerifyEmailAccountsResponseMessage): VerifyEmailAccountsOutput {

    switch(response.validationResult.isValid) {
      case true:
        return new VerifyEmailAccountsOutput(
          null, 
          new VerifyEmailAccountsViewModel(response.response));
      case false:
        let errorMsg = validationError;

        response.validationResult.errors.forEach( error => {
          errorMsg += error;
        });
        return new VerifyEmailAccountsOutput(errorMsg, null);
    }
    return null;
  }
}
