import { IValidationResult } from '../../common/interfaces/validation-result.interface';

export class GetByIdAccountsValidationResult implements IValidationResult {
  public isValid: boolean;  
  public errors: string[] = [];
}