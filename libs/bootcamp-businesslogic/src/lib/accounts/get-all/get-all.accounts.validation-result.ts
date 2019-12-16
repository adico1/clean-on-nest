import { IValidationResult } from '../../common/interfaces/validation-result.interface';

export class GetAllAccountsValidationResult implements IValidationResult {
  public isValid: boolean;  
  public errors: string[] = [];
}