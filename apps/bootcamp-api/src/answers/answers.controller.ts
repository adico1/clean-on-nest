import { Controller, Post, Get, Body, Query, Param, ParseUUIDPipe, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { User } from '../user.decorator';
import { AccountDto } from '../accounts/dto/account-dto';
import { AnswersService } from './answers.service';
import { AnswersPipe } from './answers.pipe';
import { AnswerDto } from './dto/answer-dto';
import { Observable, of } from 'rxjs';
import { ListAllEntities } from './dto/list-all-entities.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answerService: AnswersService) {}

    @Post()
    public async create(@User() user: AccountDto, @Body(new AnswersPipe()) createAnswerDto: AnswerDto): Promise<AnswerDto> {
        return this.answerService.create(createAnswerDto, user);
    }
    @Get()
    public async findAll(): Promise<AnswerDto[]> {
        return await this.answerService.findAll();
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
        return 'This action adds new answer';
    }

    @Get(':someparam')
    findOneBySomeParam(@Param() params): string {
        // console.log('AnswersController::GET(:someparam)->params.someparam:', params.someparam);
        return `This action returns a #${params.someparam} answer`;
    }

    @Get(':id')
    findOneById(@Param('id', new ParseUUIDPipe()) id): string {
        // console.log('AnswersController::GET(:id)->params.id:', id);
        return `This action returns a #${id} answer`;
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: string, @Body() updateAnswerDto: AnswerDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}
