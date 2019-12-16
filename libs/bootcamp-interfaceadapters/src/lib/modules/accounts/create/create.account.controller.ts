import { CreateAccountsInteractor, CreateAccountsRequestMessage } from '@btcp/bootcamp-blogic'
import { CreateAccountsResponsePresenter } from './create.accounts.response.presenter';
import { IView } from '../../../common/view.interface';

export class CreateAccountLogicController {
  private _interactor: CreateAccountsInteractor;
  private _presenter: CreateAccountsResponsePresenter;
  private _view: IView;

  constructor (
    interactor: CreateAccountsInteractor, 
    presenter: CreateAccountsResponsePresenter,
    view: IView) {

      this._interactor = interactor;
      this._presenter = presenter;
      this._view = view;
  }

  public async create(request: CreateAccountsRequestMessage) {
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