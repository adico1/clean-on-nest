import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity } from '../model/answer.entity';
import { Repository } from 'typeorm';
import { AnswerDto } from './dto/answer-dto';
import { AccountDto } from '../accounts/dto/account-dto';

@Injectable()
export class AnswersService {
  constructor(@InjectRepository(AnswerEntity) private readonly repo: Repository<AnswerEntity>) {}

  // private readonly decks: Deck[] = [];
  
  public async create(dto: AnswerDto, user: AccountDto): Promise<AnswerDto> {
      return this.repo.save(dto.toEntity(user))
          .then(e => AnswerDto.fromEntity(e));
  }

  public async findAll(): Promise<AnswerDto[]> {
      return await this.repo.find()
          .then(items => items.map( e => AnswerDto.fromEntity(e)));
  }
}
