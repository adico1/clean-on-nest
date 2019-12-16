import { IsString, IsNumber } from 'class-validator';

export class UpdateDeckDto {
    @IsString()
    readonly title: string;
    @IsNumber()
    readonly userId: number;
    @IsString()
    readonly version: string;
}
