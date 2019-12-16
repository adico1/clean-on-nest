import { IResponseMessage } from '@btcp/bootcamp-blogic';
import { IViewModel } from '../..';

export interface IPresenter {
  handle(response: IResponseMessage): IViewModel;
}