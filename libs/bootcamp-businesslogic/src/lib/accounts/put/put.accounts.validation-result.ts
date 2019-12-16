import { IValidationResult } from '../../common/interfaces/validation-result.interface';

export class PutAccountsValidationResult implements IValidationResult {
  public isValid: boolean;  
  public errors: string[] = [];
}