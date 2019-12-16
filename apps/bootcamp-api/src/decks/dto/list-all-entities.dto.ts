import { IsString, IsNumber } from 'class-validator';

export class ListAllEntities {
    @IsString()
    readonly title: string;
    @IsNumber()
    readonly limit: number;
    @IsString()
    readonly version: string;
}
