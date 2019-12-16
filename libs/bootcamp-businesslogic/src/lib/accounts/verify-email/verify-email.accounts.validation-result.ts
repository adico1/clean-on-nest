import { IValidationResult } from '../../common/interfaces/validation-result.interface';

export class VerifyEmailAccountsValidationResult implements IValidationResult {
  public isValid: boolean;  
  public errors: string[] = [];
}