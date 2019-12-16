// base.entity.ts
import { Column, Index } from 'typeorm';
import { IdEntity } from './id.entity';

export abstract class UserBaseEntity extends IdEntity {
    @Index()
    @Column({ type: 'uuid' })
    userId: string;
}
