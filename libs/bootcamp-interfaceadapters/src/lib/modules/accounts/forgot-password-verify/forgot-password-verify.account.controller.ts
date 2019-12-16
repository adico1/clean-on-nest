import { ForgotPasswordVerifyAccountsInteractor, ForgotPasswordVerifyAccountsRequestMessage } from '@btcp/bootcamp-blogic'
import { ForgotPasswordVerifyAccountsResponsePresenter } from './forgot-password-verify.accounts.response.presenter';
import { IView } from '../../../common/view.interface';

export class ForgotPasswordVerifyAccountLogicController {
  private _interactor: ForgotPasswordVerifyAccountsInteractor;
  private _presenter: ForgotPasswordVerifyAccountsResponsePresenter;
  private _view: IView;

  constructor (
    interactor: ForgotPasswordVerifyAccountsInteractor, 
    presenter: ForgotPasswordVerifyAccountsResponsePresenter,
    view: IView) {

      this._interactor = interactor;
      this._presenter = presenter;
      this._view = view;
  }

  public async forgotPasswordVerify(request: ForgotPasswordVerifyAccountsRequestMessage) {
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