import { Visibility, Profit } from '../../shared/deck-enum';
import { IUserBaseEntity } from './user.base.entity.interface';

export interface IDeckBase extends IUserBaseEntity {
  version: number;
  title: string;
  showGroupId: number;
  visibility: Visibility;
  profit: Profit;
}
