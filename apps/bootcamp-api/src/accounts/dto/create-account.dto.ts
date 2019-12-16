import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateAccountsRequestMessage } from '@btcp/bootcamp-blogic';
import { IDto } from '../../shared/interfaces/dto.interface';

export class CreateAccountDto implements IDto {

    // firstName
    @ApiModelProperty({
      example: 'adi',
      description: 'The first name of the User',
      format: 'string',
      minLength: 2,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    firstName: string;

    // lastName
    @ApiModelProperty({
      example: 'cohen',
      description: 'The last name of the User',
      format: 'string',
      minLength: 2,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    lastName: string;

    // Email
    @ApiModelProperty({
      example: 'adico1@gmail.com',
      description: 'The email of the User',
      format: 'email',
      uniqueItems: true,
      minLength: 5,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    email: string;

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
    password: string;

    // Password
    @ApiModelProperty({
      example: 'secret password repeat!',
      description: 'The password of the User repeated',
      format: 'string',
      minLength: 5,
      maxLength: 1024,
    })
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    passwordRepeat: string;

    public static toMessage(dto: CreateAccountDto): CreateAccountsRequestMessage {
      return {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: dto.password,
        passwordRepeat: dto.passwordRepeat
      } as CreateAccountsRequestMessage
    }
  }
