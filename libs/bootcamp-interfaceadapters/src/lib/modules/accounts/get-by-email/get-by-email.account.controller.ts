import { GetByEmailAccountsInteractor, GetByEmailAccountsRequestMessage } from '@btcp/bootcamp-blogic'
import { GetByEmailAccountsResponsePresenter } from '../../../..';
import { IView } from '../../../common/view.interface';

export class GetByEmailAccountLogicController {
  private _interactor: GetByEmailAccountsInteractor;
  private _presenter: GetByEmailAccountsResponsePresenter;
  private _view: IView;

  constructor (
    interactor: GetByEmailAccountsInteractor, 
    presenter: GetByEmailAccountsResponsePresenter,
    view: IView) {

      this._interactor = interactor;
      this._presenter = presenter;
      this._view = view;
  }

  public async getByEmail(request: GetByEmailAccountsRequestMessage) {
    const response = await this._interactor.handle(request);
    const output = this._presenter.handle(response);

    this._view.viewModel = output.result;
    this._view.render();
  }
}