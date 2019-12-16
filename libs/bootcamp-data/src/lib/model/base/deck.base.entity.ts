import { Column, Index } from 'typeorm';
import { UserBaseEntity } from './user.base.entity';
import { Visibility, Profit } from '../../shared/deck-enum';

export abstract class DeckBase extends UserBaseEntity {

  @Column({ type: 'integer' })
  version: number;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Index('IX_DeckBase_ShowGroupId')
  @Column({ type: 'bigint' })
  showGroupId: number;

  @Column({ type: 'int' })
  visibility: Visibility;

  @Column({ type: 'int' })
  profit: Profit;

}
