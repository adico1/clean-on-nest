import { IValidationResult } from '../../common/interfaces/validation-result.interface';

export class LoginAccountsValidationResult implements IValidationResult {
  public isValid: boolean;  
  public errors: string[] = [];
}