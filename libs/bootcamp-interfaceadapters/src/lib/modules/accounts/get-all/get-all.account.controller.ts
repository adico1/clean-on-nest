import { GetAllAccountsInteractor, GetAllAccountsRequestMessage } from '@btcp/bootcamp-blogic'
import { GetAllAccountsResponsePresenter } from '../../../..';
import { IView } from '../../../common/view.interface';

export class GetAllAccountLogicController {
  private _interactor: GetAllAccountsInteractor;
  private _presenter: GetAllAccountsResponsePresenter;
  private _view: IView;

  constructor (
    interactor: GetAllAccountsInteractor, 
    presenter: GetAllAccountsResponsePresenter,
    view: IView) {

      this._interactor = interactor;
      this._presenter = presenter;
      this._view = view;
  }

  public async getAll(request: GetAllAccountsRequestMessage) {
    const response = await this._interactor.handle(request);
    const output = this._presenter.handle(response);

    this._view.viewModel = output.result;
    this._view.render();
  }
}