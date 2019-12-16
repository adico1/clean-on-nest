import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { DeckBase } from './base/deck.base.entity';
import { IAccountEntity } from './interfaces/account.entity.interface';
import { IAnswerEntity } from './interfaces/answer.entity.interface';

@Entity({ name: 'deck' })
export class DeckEntity extends DeckBase {

  @Column({ type: 'smallint' })
  rating: number;

  @Column({ type: 'integer' })
  rates: number;

  @Column({ type: 'smallint' })
  qaCorrectness: number;

  @Column({ type: 'smallint' })
  interesting: number;

  @Column({ type: 'smallint' })
  useful: number;

  @Column({ type: 'smallint' })
  materialLevel: number;

  @Column({ type: 'jsonb' })
  questions: Array<object>;

  @ManyToOne('AccountEntity', 'id')
  author: IAccountEntity;

  @OneToMany('AnswerEntity', 'deck') // note: we will create deck property in the Answer class
  answers: IAnswerEntity[];
}