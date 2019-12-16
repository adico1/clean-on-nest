import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsArray, } from 'class-validator';
import { DeckEntity } from '@btcp/bootcamp-data';
import { User } from '../../user.decorator';
import { Visibility, Profit } from '../../shared/deck-enum';
import { AccountDto } from '../../accounts/dto/account-dto';

export class DeckDto implements Readonly<DeckDto> {
    @ApiModelProperty({ required: true })
    @IsUUID()
    id: string;
    @ApiModelProperty({ required: true })
    @IsNumber()
    version: number;
    @ApiModelProperty({ required: true })
    @IsString()
    title: string;
    @ApiModelProperty({ required: true })
    @IsString()
    userId: string;
    @ApiModelProperty({ required: true })
    @IsNumber()
    showGroupId: number;
    @ApiModelProperty({ required: true })
    @IsNumber()
    visibility: Visibility;
    @ApiModelProperty({ required: true })
    @IsNumber()
    profit: Profit;
    
    @ApiModelProperty({ required: true })
    @IsNumber()
    rating: number;
    @ApiModelProperty({ required: true })
    @IsNumber()
    rates: number;
    @ApiModelProperty({ required: true })
    @IsNumber()
    qaCorrectness: number;
    @ApiModelProperty({ required: true })
    @IsNumber()
    interesting: number;
    @ApiModelProperty({ required: true })
    @IsNumber()
    useful: number;
    @ApiModelProperty({ required: true })
    @IsNumber()
    materialLevel: number;
    @ApiModelProperty({ required: true })
    @IsArray()
    questions: Array<object>;

    public static from(dto: Partial<DeckDto>) {
        const it = new DeckDto();
        it.id = dto.id;
        it.title = dto.title;
        it.version = dto.version;
        it.profit = dto.profit;
        it.showGroupId = dto.showGroupId;
        it.userId = dto.userId;
        it.visibility = dto.visibility;

        it.rating = dto.rating;
        it.rates = dto.rates;
        it.qaCorrectness = dto.qaCorrectness;
        it.interesting = dto.interesting;
        it.useful = dto.useful;
        it.materialLevel = dto.materialLevel;
        it.questions = dto.questions;
        return it;
      }
    
      public static fromEntity(entity: DeckEntity) {
        return this.from({
          id: entity.id,
          title: entity.title,
          version: entity.version,
          profit: entity.profit,
          showGroupId: entity.showGroupId,
          userId: entity.userId,
          visibility: entity.visibility,

          rating: entity.rating,
          rates: entity.rates,
          qaCorrectness: entity.qaCorrectness,
          interesting: entity.interesting,
          useful: entity.useful,
          materialLevel: entity.materialLevel,
          questions: entity.questions
        });
      }
    
      public toEntity(user: AccountDto = null) {
        const it = new DeckEntity();
        it.id = this.id;
        it.title = this.title;
        it.version = this.version;
        it.createDateTime = new Date();
        it.lastChangedDateTime = new Date();
        it.profit = this.profit;
        it.showGroupId = this.showGroupId;
        it.userId = user.id;
        it.visibility = this.visibility;

        it.rating = this.rating;
        it.rates = this.rates;
        it.qaCorrectness = this.qaCorrectness;
        it.interesting = this.interesting;
        it.useful = this.useful;
        it.materialLevel = this.materialLevel;
        it.questions = this.questions;

        return it;
      }
}
