import { IsNotEmpty,  IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { VerifyEmailAccountsRequestMessage } from '@btcp/bootcamp-blogic';
import { InetLocation } from '@btcp/bootcamp-entities';

export class VerifyUuidDto {
  public inetLocation: InetLocation;

    @ApiModelProperty({
        description: 'uuid to verify user',
        format: 'uuid',
        uniqueItems: true,
      })
    @IsNotEmpty()
    @IsUUID()
    readonly verification: string;

    static toMessage(dto: VerifyUuidDto) {
      return {
        verification: dto.verification,
        inetLocation: {...dto.inetLocation}
      } as VerifyEmailAccountsRequestMessage;
    }
}
