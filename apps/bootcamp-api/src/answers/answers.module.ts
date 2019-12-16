import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { AnswerEntity } from '../model/answer.entity';
import { AnswersController } from './answers.controller';

const answerMockRepository = {};

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity])],
  providers: [
    AnswersService,
      {
        provide: getRepositoryToken(AnswerEntity),
        useValue: answerMockRepository,
      },
  ],
  controllers: [AnswersController],
  exports: []
})
export class AnswersModule {}
