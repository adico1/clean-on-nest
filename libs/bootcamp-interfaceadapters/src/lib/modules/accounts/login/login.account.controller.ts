import { LoginAccountsInteractor, LoginAccountsRequestMessage } from '@btcp/bootcamp-blogic'
import { LoginAccountsResponsePresenter } from './login.accounts.response.presenter';
import { IView } from '../../../common/view.interface';

export class LoginAccountLogicController {
  private _interactor: LoginAccountsInteractor;
  private _presenter: LoginAccountsResponsePresenter;
  private _view: IView;

  constructor (
    interactor: LoginAccountsInteractor, 
    presenter: LoginAccountsResponsePresenter,
    view: IView) {

      this._interactor = interactor;
      this._presenter = presenter;
      this._view = view;
  }

  public async login(request: LoginAccountsRequestMessage) {
    const response = await this._interactor.handle(request);
    const output = this._presenter.handle(response);

    this._view.viewModel = output.result;
    this._view.render();
  }
}