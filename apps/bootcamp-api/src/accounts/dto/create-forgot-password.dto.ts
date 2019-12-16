import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ForgotPasswordAccountsRequestMessage } from '@btcp/bootcamp-blogic';
import { IDto } from '../../shared/interfaces/dto.interface';
import { InetLocationDto } from './inet-location.dto';

export class CreateForgotPasswordDto implements IDto {
  public inetLocation: InetLocationDto;
  
    @ApiModelProperty({
      example: 'pejman@gmail.com',
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
    readonly email: string;

    static toMessage(dto: CreateForgotPasswordDto): ForgotPasswordAccountsRequestMessage {
      return {
        email: dto.email,
        inetLocation: {...dto.inetLocation}
      } as ForgotPasswordAccountsRequestMessage;
    }
  }
