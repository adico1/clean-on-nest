import { Controller, Get, Post, Param, Body, Query, Put, Delete, ParseUUIDPipe, ParseIntPipe } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { ListAllEntities } from './dto/list-all-entities.dto';
import { DecksService } from './decks.service';
import { DecksPipe } from './decks.pipe';
import { DeckDto } from './dto/deck.dto';
import { AccountDto } from '../accounts/dto/account-dto';
import { User } from '../user.decorator';

@Controller('decks')
export class DecksController {
    constructor(private readonly deckService: DecksService) {}

    @Post()
    public async create(@User() user: AccountDto, @Body(new DecksPipe()) createDeckDto: DeckDto): Promise<DeckDto> {
        return this.deckService.create(createDeckDto, user);
    }
    @Get()
    public async findAll(): Promise<DeckDto[]> {
        return await this.deckService.findAll();
    }

    @Get()
    findAllQuery(@Query() query: ListAllEntities) {
        return `This action returns all cats (limit: ${query.limit} items)`;
    }
    
    @Get('noAsync')
    findAllNoAsync(): string[] {
        return [];
    }

    @Get('observable')
    findAllObservable(): Observable<string[]> {
        return of([]);
    }

    @Post()
    createWithoutBody(): string {
        return 'This action adds new deck';
    }

    @Get(':someparam')
    findOneBySomeParam(@Param() params): string {
        // console.log('DecksController::GET(:someparam)->params.someparam:', params.someparam);
        return `This action returns a #${params.someparam} deck`;
    }

    @Get(':id')
    findOneById(@Param('id', new ParseUUIDPipe()) id): string {
        // console.log('DecksController::GET(:id)->params.id:', id);
        return `This action returns a #${id} deck`;
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: string, @Body() updateDeckDto: UpdateDeckDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}
