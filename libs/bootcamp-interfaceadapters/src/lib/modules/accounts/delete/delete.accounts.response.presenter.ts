import { IPresenter } from '../../../common/presenter.interface';
import { DeleteAccountsResponseMessage } from '@btcp/bootcamp-blogic';
import { DeleteAccountsViewModel } from './delete.accounts.viewmodel';
import { Messages } from '@btcp/bootcamp-entities';
import { DeleteAccountsOutput } from './delete.accounts.output';

const validationError = Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX;

export class DeleteAccountsResponsePresenter implements IPresenter {
  public handle(response: DeleteAccountsResponseMessage): DeleteAccountsOutput {

    switch(response.validationResult.isValid) {
      case true:
        return new DeleteAccountsOutput(
          null, 
          new DeleteAccountsViewModel());
      case false:
        let errorMsg = validationError;

        response.validationResult.errors.forEach( error => {
          errorMsg += error;
        });
        return new DeleteAccountsOutput(errorMsg, null);
    }
    return null;
  }
}
