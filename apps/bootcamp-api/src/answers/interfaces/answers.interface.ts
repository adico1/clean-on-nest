import { AnswerDto } from '../dto/answer-dto';

export interface Answers {
  id: string;
  userId: string;
  deckId: string;
  answers: Array<AnswerDto>;
}
