import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ChangePasswordDto {


    // Password
    @ApiModelProperty({
      example: 'secret password change me!',
      description: 'The password of the User',
      format: 'string',
      minLength: 5,
      maxLength: 1024,
    })
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly password: string;

    // Password
    @ApiModelProperty({
      example: 'your current password',
      description: 'The password of the User',
      format: 'string',
      minLength: 5,
      maxLength: 1024,
    })
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly newPassword: string;
  }
