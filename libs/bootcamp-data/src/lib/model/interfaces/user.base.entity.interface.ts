import { IIdEntity } from './id.entity.interface';

export interface IUserBaseEntity extends IIdEntity {
    userId: string;
}
