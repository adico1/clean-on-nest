import { IDeckBase } from './deck.base.entity.interface';

export interface IDeckEntity extends IDeckBase {
  rating: number;
  rates: number;
  qaCorrectness: number;
  interesting: number;
  useful: number;
  materialLevel: number;
  questions: Array<object>;
}