import { GetByIdAccountsInteractor, AccountIdRequestMessage } from '@btcp/bootcamp-blogic'
import { GetByIdAccountsResponsePresenter } from '../../../..';
import { IView } from '../../../common/view.interface';

export class GetByIdAccountLogicController {
  private _interactor: GetByIdAccountsInteractor;
  private _presenter: GetByIdAccountsResponsePresenter;
  private _view: IView;

  constructor (
    interactor: GetByIdAccountsInteractor, 
    presenter: GetByIdAccountsResponsePresenter,
    view: IView) {

      this._interactor = interactor;
      this._presenter = presenter;
      this._view = view;
  }

  public async getById(request: AccountIdRequestMessage) {
    const response = await this._interactor.handle(request);
    const output = this._presenter.handle(response);

    this._view.viewModel = output.result;
    this._view.render();
  }
}