import { ApiModelProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';

export class AccountDto {
    @ApiModelProperty({ required: true })
    @IsUUID()
    id: string;
    @ApiModelProperty({ required: true })
    @IsString()
    email: string;
    @ApiModelProperty({ required: true })
    @IsString()
    firstName: string;
    @ApiModelProperty({ required: true })
    @IsString()
    lastName: string;
    @ApiModelProperty({ required: true })
    @IsString()
    pw: string;
    @ApiModelProperty({ required: true })
    @IsString()
    pwSalt: string;
    @ApiModelProperty({ required: true })
    @IsString()
    jwtToken: string;
    @ApiModelProperty({ required: true })
    @IsString()
    refreshToken: string;
}
