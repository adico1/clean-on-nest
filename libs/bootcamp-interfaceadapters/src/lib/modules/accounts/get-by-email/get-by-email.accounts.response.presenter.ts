import { IPresenter } from '../../../common/presenter.interface';
import { GetByEmailAccountsResponseMessage } from '@btcp/bootcamp-blogic';
import { GetByEmailAccountsViewModel } from './get-by-email.accounts.viewmodel';
import { GetByEmailAccountsOutput } from './get-by-email.accounts.output';
import { Messages } from '@btcp/bootcamp-entities';

const validationError = Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX;

export class GetByEmailAccountsResponsePresenter implements IPresenter {
  public handle(response: GetByEmailAccountsResponseMessage): GetByEmailAccountsOutput {

    switch(response.validationResult.isValid) {
      case true:
        return new GetByEmailAccountsOutput(
          null, 
          new GetByEmailAccountsViewModel(response.response));
      case false:
        let errorMsg = validationError;

        response.validationResult.errors.forEach( error => {
          errorMsg += error;
        });
        return new GetByEmailAccountsOutput(errorMsg, null);
    }
    return null;
  }
}
