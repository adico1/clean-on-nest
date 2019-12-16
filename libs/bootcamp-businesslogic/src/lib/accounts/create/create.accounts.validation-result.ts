import { IValidationResult } from '../../common/interfaces/validation-result.interface';

export class CreateAccountsValidationResult implements IValidationResult {
  public isValid: boolean;  
  public errors: string[] = [];
}