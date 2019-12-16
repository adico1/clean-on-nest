import { Entity, Column } from 'typeorm';
import { IdEntity } from './base/id.entity';

@Entity({ name: 'refresh-token' })
export class RefreshTokenEntity extends IdEntity {

  @Column({ type: 'varchar', length: 300, nullable: false })
  refreshToken: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  ip: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  browser: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  country: string;
}