import { IPresenter } from '../../../common/presenter.interface';
import { RefreshAccessTokenAccountsResponseMessage } from '@btcp/bootcamp-blogic';
import { RefreshAccessTokenAccountsViewModel } from './refresh-access-token.accounts.viewmodel';
import { Messages } from '@btcp/bootcamp-entities';
import { RefreshAccessTokenAccountsOutput } from './refresh-access-token.accounts.output';

const validationError = Messages.VALIDATIONS_ERROR_MESSAGE_PREFIX;

export class RefreshAccessTokenAccountsResponsePresenter implements IPresenter {
  public handle(response: RefreshAccessTokenAccountsResponseMessage): RefreshAccessTokenAccountsOutput {

    switch(response.validationResult.isValid) {
      case true:
        return new RefreshAccessTokenAccountsOutput(
          null, 
          new RefreshAccessTokenAccountsViewModel(response.response));
      case false:
        let errorMsg = validationError;

        response.validationResult.errors.forEach( error => {
          errorMsg += error;
        });
        return new RefreshAccessTokenAccountsOutput(errorMsg, null);
    }
    return null;
  }
}
