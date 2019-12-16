import { Entity, Column, Index, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { UserBaseEntity } from './base/user.base.entity';
import { DeckEntity } from './deck.entity';
import { AccountEntity } from './account.entity';

@Entity({ name: 'answer' })
export class AnswerEntity extends UserBaseEntity {

  @Index()
  @OneToOne(type => DeckEntity)
  @JoinColumn()
  @Column({ type: 'uuid' })
  deck: DeckEntity;
  
  @Column({ type: 'jsonb' })
  answers: Array<object>;

  @ManyToOne(type => AccountEntity, account => account.answers)
  student: AccountEntity;
  
}
