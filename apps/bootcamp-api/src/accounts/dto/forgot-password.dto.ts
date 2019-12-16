import { ApiModelProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate, IsBoolean } from 'class-validator';

export class ForgotPasswordDto {
  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;
  @ApiModelProperty({ required: true })
  @IsString()
  email: string;
  @ApiModelProperty({ required: true })
  @IsString()
  browser: string;
  @ApiModelProperty()
  @IsString()
  browserChanged: string;
  @ApiModelProperty({ required: true })
  @IsString()
  country: string;
  @ApiModelProperty()
  @IsString()
  countryChanged: string;
  @ApiModelProperty({ required: true })
  @IsDate()
  expires: Date;
  @ApiModelProperty()
  @IsBoolean()
  finalUsed: boolean;
  @ApiModelProperty()
  @IsBoolean()
  firstUsed: boolean;
  @ApiModelProperty({ required: true })
  @IsString()
  ip: string;
  @ApiModelProperty()
  @IsString()
  ipChanged: string;
  @ApiModelProperty({ required: true })
  @IsString()
  verification: string;
}
