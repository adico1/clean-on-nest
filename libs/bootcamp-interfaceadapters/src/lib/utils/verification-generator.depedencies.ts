import { v4 } from 'uuid';
import { IVerificationGeneratorDependencies } from '@btcp/bootcamp-entities';
import { addHours } from 'date-fns';

export class VerificationGeneratorDependencies implements IVerificationGeneratorDependencies {
  public createVerificationCode(): string {
    return v4();
  }

  public getExpirationDate(hoursToVerify: number): Date {
    return addHours(new Date(), hoursToVerify);
  }
}