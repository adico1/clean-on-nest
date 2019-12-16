import { ResetPasswordAccountsInteractor, ResetPasswordAccountsRequestMessage } from '@btcp/bootcamp-blogic'
import { ResetPasswordAccountsResponsePresenter } from './reset-password.accounts.response.presenter';
import { IView } from '../../../common/view.interface';

export class ResetPasswordAccountLogicController {
  private _interactor: ResetPasswordAccountsInteractor;
  private _presenter: ResetPasswordAccountsResponsePresenter;
  private _view: IView;

  constructor (
    interactor: ResetPasswordAccountsInteractor, 
    presenter: ResetPasswordAccountsResponsePresenter,
    view: IView) {

      this._interactor = interactor;
      this._presenter = presenter;
      this._view = view;
  }

  public async resetPassword(request: ResetPasswordAccountsRequestMessage) {
    let response = null;
    try {
      response = await this._interactor.handle(request);

      const output = this._presenter.handle(response);

      this._view.errorModel = output.error;
      this._view.viewModel = output.result;
      
    } catch(ex) {
      this._view.errorModel = ex;
      this._view.viewModel = null;
    }

    this._view.render();
  }
}