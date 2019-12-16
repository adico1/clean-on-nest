import { IPresenter } from '../../../common/presenter.interface';
import { GetByIdAccountsResponseMessage } from '@btcp/bootcamp-blogic';
import { GetByIdAccountsViewModel } from './get-by-id.accounts.viewmodel';
import { GetByIdAccountsOutput } from './get-by-id.accounts.output';
import { Messages } from '@btcp/bootcamp-entities';

const validationError = Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX;

export class GetByIdAccountsResponsePresenter implements IPresenter {
  public handle(response: GetByIdAccountsResponseMessage): GetByIdAccountsOutput {

    switch(response.validationResult.isValid) {
      case true:
        return new GetByIdAccountsOutput(
          null, 
          new GetByIdAccountsViewModel(response.response));
      case false:
        let errorMsg = validationError;

        response.validationResult.errors.forEach( error => {
          errorMsg += error;
        });
        return new GetByIdAccountsOutput(errorMsg, null);
    }
    return null;
  }
}
