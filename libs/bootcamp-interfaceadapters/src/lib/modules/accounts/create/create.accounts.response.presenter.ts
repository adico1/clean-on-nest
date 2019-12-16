import { IPresenter } from '../../../common/presenter.interface';
import { CreateAccountsResponseMessage } from '@btcp/bootcamp-blogic';
import { CreateAccountsViewModel } from './create.accounts.viewmodel';
import { Messages } from '@btcp/bootcamp-entities';
import { CreateAccountsOutput } from './create.accounts.output';

const validationError = Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX;

export class CreateAccountsResponsePresenter implements IPresenter {
  public handle(response: CreateAccountsResponseMessage): CreateAccountsOutput {

    switch(response.validationResult.isValid) {
      case true:
        return new CreateAccountsOutput(
          null, 
          new CreateAccountsViewModel(response.response));
      case false:
        let errorMsg = validationError;

        response.validationResult.errors.forEach( error => {
          errorMsg += `${error} | `;
        });
        errorMsg = errorMsg.substring(0, errorMsg.length - ' | '.length);
        return new CreateAccountsOutput(errorMsg, null);
    }
    return null;
  }
}
