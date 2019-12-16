import { RefreshAccessTokenAccountsInteractor, RefreshAccessTokenAccountsRequestMessage } from '@btcp/bootcamp-blogic'
import { RefreshAccessTokenAccountsResponsePresenter } from './refresh-access-token.accounts.response.presenter';
import { IView } from '../../../common/view.interface';

export class RefreshAccessTokenAccountLogicController {
  private _interactor: RefreshAccessTokenAccountsInteractor;
  private _presenter: RefreshAccessTokenAccountsResponsePresenter;
  private _view: IView;

  constructor (
    interactor: RefreshAccessTokenAccountsInteractor, 
    presenter: RefreshAccessTokenAccountsResponsePresenter,
    view: IView) {

      this._interactor = interactor;
      this._presenter = presenter;
      this._view = view;
  }

  public async refreshAccessToken(request: RefreshAccessTokenAccountsRequestMessage) {
    const response = await this._interactor.handle(request);
    const output = this._presenter.handle(response);

    this._view.viewModel = output.result;
    this._view.render();
  }
}