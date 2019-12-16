import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from '@btcp/bootcamp-data';
import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';

const deckMockRepository = {
    /* mock implementation
    ...
    */
};

@Module({
    imports: [TypeOrmModule.forFeature([DeckEntity])],
    providers: [
        DecksService,
        {
          provide: getRepositoryToken(DeckEntity),
          useValue: deckMockRepository,
        },
    ],
    controllers: [DecksController],
    exports: []
})
export class DecksModule {}
