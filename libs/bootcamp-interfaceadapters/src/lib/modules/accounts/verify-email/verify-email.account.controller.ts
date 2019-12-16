import { VerifyEmailAccountsInteractor, VerifyEmailAccountsRequestMessage } from '@btcp/bootcamp-blogic'
import { VerifyEmailAccountsResponsePresenter } from './verify-email.accounts.response.presenter';
import { IView } from '../../../common/view.interface';

export class VerifyEmailAccountLogicController {
  private _interactor: VerifyEmailAccountsInteractor;
  private _presenter: VerifyEmailAccountsResponsePresenter;
  private _view: IView;

  constructor (
    interactor: VerifyEmailAccountsInteractor, 
    presenter: VerifyEmailAccountsResponsePresenter,
    view: IView) {

      this._interactor = interactor;
      this._presenter = presenter;
      this._view = view;
  }

  public async verifyEmail(request: VerifyEmailAccountsRequestMessage) {
    const response = await this._interactor.handle(request);
    const output = this._presenter.handle(response);

    this._view.viewModel = output.result;
    this._view.render();
  }
}