// base.entity.ts
import { Column } from 'typeorm';
import { IdEntity } from './id.entity';

export abstract class BaseEntity extends IdEntity {
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isArchived: boolean;

    @Column({ type: 'varchar', length: 300 })
    createdBy: string;

    @Column({ type: 'varchar', length: 300 })
    lastChangedBy: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    internalComment: string | null;
}