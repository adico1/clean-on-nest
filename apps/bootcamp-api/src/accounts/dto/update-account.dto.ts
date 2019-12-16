import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { PutAccountsRequestMessage } from '@btcp/bootcamp-blogic';

export class UpdateAccountDto {
  public id: string;
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
    readonly firstName: string;

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
    readonly lastName: string;

    static toMessage(dto: UpdateAccountDto) {
      return {
        accountId: dto.id, 
        firstName: dto.firstName,
        lastName: dto.lastName
      } as PutAccountsRequestMessage
    }
  }
