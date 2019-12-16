import { IUserBaseEntity } from './user.base.entity.interface';
import { IDeckEntity } from './deck.entity.interface';

export interface IAnswerEntity extends IUserBaseEntity {
  deck: IDeckEntity;
  answers: Array<object>;
}
