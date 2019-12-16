import { ApiModelProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';
import { RefreshTokenEntity } from '@btcp/bootcamp-data';

export class RefreshTokenDto {
  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;
  @ApiModelProperty({ required: true })
  @IsString()
  ip: string;
  @ApiModelProperty({ required: true })
  @IsString()
  browser: string;
  @ApiModelProperty({ required: true })
  @IsString()
  country: string;
  @ApiModelProperty({ required: true })
  @IsString()
  refreshToken: string;

  public static from(dto: Partial<RefreshTokenDto>) {
    const it = new RefreshTokenDto();
    it.id = dto.id;
    it.ip = dto.ip;
    it.browser = dto.browser;
    it.country = dto.country;
    it.refreshToken = dto.refreshToken;

    return it;
  }

  public static fromEntity(entity: RefreshTokenEntity) {
    if (!entity) {
      return null;
    }

    return this.from({
      id: entity.id,
      ip: entity.ip,
      browser: entity.browser,
      country: entity.country,
      refreshToken: entity.refreshToken
    });
  }

  public toEntity() {
    const it = new RefreshTokenEntity();
    it.id = this.id;
    it.createDateTime = new Date();
    it.lastChangedDateTime = new Date();
    it.ip = this.ip;
    it.browser = this.browser;
    it.country = this.country;
    it.refreshToken = this.refreshToken;
    return it;
  }
}
