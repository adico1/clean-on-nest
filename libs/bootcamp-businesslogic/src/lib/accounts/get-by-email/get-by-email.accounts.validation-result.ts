import { IValidationResult } from '../../common/interfaces/validation-result.interface';

export class GetByEmailAccountsValidationResult implements IValidationResult {
  public isValid: boolean;  
  public errors: string[] = [];
}