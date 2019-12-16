import { IViewOutput } from './view-output.interface';

export class ViewOutputImplementation<TViewModel> implements IViewOutput<TViewModel> {
  private _result: TViewModel;
  private _error: string;

  constructor(error: string, result: TViewModel) {
    this._result = result;
    this._error = error;
  }
  public get result(): TViewModel {
    return this._result;
  }
  public get error(): string {
    return this._error;
  }
}
