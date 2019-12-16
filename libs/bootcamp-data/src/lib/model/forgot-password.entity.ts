import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { IdEntity } from './base/id.entity';

@Entity({ name: 'forgot-password' })
export class ForgotPasswordEntity extends IdEntity {

  @Column({ type: 'varchar', length: 300, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  verification: string;

  @Column({ type: 'boolean', default: false })
  firstUsed: boolean;

  @Column({ type: 'boolean', default: false })
  finalUsed: boolean;

  @Column({ type: 'date', nullable: false })
  expires: Date;

  @Column({ type: 'varchar', length: 300, nullable: false })
  ip: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  browser: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  country: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  ipChanged: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  browserChanged: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  countryChanged: string;
}