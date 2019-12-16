import { IsNotEmpty,  IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { RefreshAccessTokenAccountsRequestMessage } from '@btcp/bootcamp-blogic';
import { InetLocation } from '@btcp/bootcamp-entities';

export class RefreshAccessTokenDto {
  public inetLocation: InetLocation;

    @ApiModelProperty({
        description: 'uuid for refresh token',
        format: 'uuid',
        uniqueItems: true,
      })
    @IsNotEmpty()
    @IsUUID()
    readonly refreshToken: string;

    static toMessage(dto: RefreshAccessTokenDto) {
      return {
        refreshToken: dto.refreshToken,
        inetLocation: {...dto.inetLocation}
      } as RefreshAccessTokenAccountsRequestMessage
    }
}
