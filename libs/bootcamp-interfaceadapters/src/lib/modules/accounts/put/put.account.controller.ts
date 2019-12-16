import { PutAccountsInteractor, PutAccountsRequestMessage } from '@btcp/bootcamp-blogic'
import { PutAccountsResponsePresenter } from './put.accounts.response.presenter';
import { IView } from '../../../common/view.interface';

export class PutAccountLogicController {
  private _interactor: PutAccountsInteractor;
  private _presenter: PutAccountsResponsePresenter;
  private _view: IView;

  constructor (
    interactor: PutAccountsInteractor, 
    presenter: PutAccountsResponsePresenter,
    view: IView) {

      this._interactor = interactor;
      this._presenter = presenter;
      this._view = view;
  }

  public async put(request: PutAccountsRequestMessage) {
    const response = await this._interactor.handle(request);
    const output = this._presenter.handle(response);

    this._view.viewModel = output.result;
    this._view.render();
  }
}