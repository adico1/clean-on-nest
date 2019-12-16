import { Entity, Column, Index, OneToMany } from 'typeorm';
import { IdEntity } from './base/id.entity';
import { IAccountEntity } from './interfaces/account.entity.interface';
import { IDeckEntity } from './interfaces/deck.entity.interface';
import { IAnswerEntity } from './interfaces/answer.entity.interface';

@Entity({ name: 'account' })
export class AccountEntity extends IdEntity implements IAccountEntity {

  @Column({ type: 'varchar', length: 300 })
  firstName: string;

  @Column({ type: 'varchar', length: 300 })
  lastName: string;

  @Index('IX_Account_Email', {unique: true})
  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 4096 })
  pw: string;

  @Column({ type: 'varchar', length: 4096 })
  pwSalt: string;

  @Index('IX_Account_Token')
  @Column({ type: 'varchar', length: 4096, nullable: true })
  jwtToken: string;

  @Index('IX_Account_RefreshToken')
  @Column({ type: 'varchar', length: 4096, nullable: true })
  refreshToken: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'varchar', array: true, nullable: false, default: '{"user"}' })
  roles: string[];

  @Column({ type: 'varchar', nullable: false })
  verification: string;

  @Column({ type: 'timestamp', nullable: false, default: () => 'LOCALTIMESTAMP' })
  verificationExpires: Date;

  @Column({ type: 'integer', nullable: false, default: 0 })
  loginAttempts: number;

  @Column({ type: 'timestamp', nullable: false, default: () => 'LOCALTIMESTAMP' })
  blockExpires: Date;

  @OneToMany('DeckEntity', 'userId') // note: we will create author property in the Photo class below
  decks: IDeckEntity[];

  @OneToMany('AnswerEntity', 'student') // note: we will create author property in the Photo class below
  answers: IAnswerEntity[];
}
