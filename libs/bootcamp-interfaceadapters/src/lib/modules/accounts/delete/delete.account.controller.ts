import { DeleteAccountsInteractor, DeleteAccountsRequestMessage } from '@btcp/bootcamp-blogic'
import { DeleteAccountsResponsePresenter } from './delete.accounts.response.presenter';
import { IView } from '../../../common/view.interface';

export class DeleteAccountLogicController {
  private _interactor: DeleteAccountsInteractor;
  private _presenter: DeleteAccountsResponsePresenter;
  private _view: IView;

  constructor (
    interactor: DeleteAccountsInteractor, 
    presenter: DeleteAccountsResponsePresenter,
    view: IView) {

      this._interactor = interactor;
      this._presenter = presenter;
      this._view = view;
  }

  public async delete(request: DeleteAccountsRequestMessage) {
    const response = await this._interactor.handle(request);
    const output = this._presenter.handle(response);

    this._view.viewModel = output.result;
    this._view.render();
  }
}