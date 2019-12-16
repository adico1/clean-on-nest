import { IViewModel } from '../..';

export abstract class IView {
  abstract get viewModel(): IViewModel
  abstract set viewModel(viewModel: IViewModel);
  abstract get errorModel(): string | Error
  abstract set errorModel(errorModel: string | Error);
  abstract render(): void;
}
