import { ApiModelProperty } from '@nestjs/swagger';
import { IsUUID, IsArray } from 'class-validator';
import { AnswerEntity } from '../../model/answer.entity';
import { AccountDto } from '../../accounts/dto/account-dto';
import { DeckDto } from '../../decks/dto/deck.dto';
import { DeckEntity } from '../../model/deck.entity';

export class AnswerDto implements Readonly<AnswerDto> {
  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;
  @ApiModelProperty({ required: true })
  @IsUUID()
  userId: string;
  @ApiModelProperty({ required: true })
  @IsUUID()
  deckId: string;
  @ApiModelProperty({ required: true })
  @IsArray()
  answers: Array<AnswerDto>;
  
  deck: DeckDto;

  public static from(dto: Partial<AnswerDto>) {
    const it = new AnswerDto();
    it.id = dto.id;
    it.deckId = dto.deckId;
    it.userId = dto.userId;
    it.answers = dto.answers;

    it.deck = new DeckDto();
    it.deck.id = it.deckId;

    return it;
  }

  public static fromEntity(entity: AnswerEntity) {
    return this.from({
      id: entity.id,
      deckId: entity.deck.id,
      userId: entity.userId,
      answers: entity.answers as Array<AnswerDto>,
    });
  }

  public toEntity(user: AccountDto = null) {
    const deck = new DeckEntity();
    deck.id = this.deckId;

    const it = new AnswerEntity();
    it.id = this.id;
    it.userId = user.id;
    it.deck = deck;
    it.answers = this.answers;
    return it;
  }
}
