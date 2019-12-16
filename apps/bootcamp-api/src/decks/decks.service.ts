import { Injectable } from '@nestjs/common';
import { Deck } from './interfaces/deck.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DeckEntity } from '@btcp/bootcamp-data';
import { Repository } from 'typeorm';
import { DeckDto } from './dto/deck.dto';
import { AccountDto } from '../accounts/dto/account-dto';

@Injectable()
export class DecksService {
    constructor(@InjectRepository(DeckEntity) private readonly repo: Repository<DeckEntity>) {}

    private readonly decks: Deck[] = [];
    
    public async create(dto: DeckDto, user: AccountDto): Promise<DeckDto> {
        return this.repo.save(dto.toEntity(user))
            .then(e => DeckDto.fromEntity(e));
    }

    public async findAll(): Promise<DeckDto[]> {
        return await this.repo.find()
            .then(items => items.map( e => DeckDto.fromEntity(e)));
    }
}
