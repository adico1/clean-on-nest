import { IPresenter } from '../../../common/presenter.interface';
import { GetAllAccountsResponseMessage } from '@btcp/bootcamp-blogic';
import { GetAllAccountsViewModel } from './get-all.accounts.viewmodel';
import { Account, Messages } from '@btcp/bootcamp-entities';
import { GetAllAccountsOutput } from './get-all.accounts.output';

const validationError = Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX;

export class GetAllAccountsResponsePresenter implements IPresenter {
  public handle(response: GetAllAccountsResponseMessage): GetAllAccountsOutput {

    switch(response.validationResult.isValid) {
      case true:
        const accounts: Account[] = response.response;
        const getAllAccountsViewModel = accounts.map(entity => new GetAllAccountsViewModel(entity));
        return new GetAllAccountsOutput(null, getAllAccountsViewModel);
      case false:
        let errorMsg = validationError;

        response.validationResult.errors.forEach( error => {
          errorMsg += error;
        });
        return new GetAllAccountsOutput(errorMsg, null);
    }
    return null;
  }
}
