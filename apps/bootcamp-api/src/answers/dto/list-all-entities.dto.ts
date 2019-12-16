import { IsNumber } from 'class-validator';

export class ListAllEntities {
    @IsNumber()
    readonly limit: number;
}
