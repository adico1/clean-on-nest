import { ForgotPasswordAccountsInteractor, ForgotPasswordAccountsRequestMessage } from '@btcp/bootcamp-blogic'
import { ForgotPasswordAccountsResponsePresenter } from './forgot-password.accounts.response.presenter';
import { IView } from '../../../common/view.interface';

export class ForgotPasswordAccountLogicController {
  private _interactor: ForgotPasswordAccountsInteractor;
  private _presenter: ForgotPasswordAccountsResponsePresenter;
  private _view: IView;

  constructor (
    interactor: ForgotPasswordAccountsInteractor, 
    presenter: ForgotPasswordAccountsResponsePresenter,
    view: IView) {

      this._interactor = interactor;
      this._presenter = presenter;
      this._view = view;
  }

  public async forgotPassword(request: ForgotPasswordAccountsRequestMessage) {
    const response = await this._interactor.handle(request);
    const output = this._presenter.handle(response);

    this._view.viewModel = output.result;
    this._view.render();
  }
}