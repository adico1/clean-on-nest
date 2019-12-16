import { IPresenter } from '../../../common/presenter.interface';
import { PutAccountsResponseMessage } from '@btcp/bootcamp-blogic';
import { PutAccountsViewModel } from './put.accounts.viewmodel';
import { PutAccountsOutput } from './put.accounts.output';
import { Messages } from '@btcp/bootcamp-entities';

const validationError = Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX;

export class PutAccountsResponsePresenter implements IPresenter {
  public handle(response: PutAccountsResponseMessage): PutAccountsOutput {

    switch(response.validationResult.isValid) {
      case true:
        return new PutAccountsOutput(
          null, 
          new PutAccountsViewModel(response.response));
      case false:
        let errorMsg = validationError;

        response.validationResult.errors.forEach( error => {
          errorMsg += error;
        });
        return new PutAccountsOutput(errorMsg, null);
    }
    return null;
  }
}
