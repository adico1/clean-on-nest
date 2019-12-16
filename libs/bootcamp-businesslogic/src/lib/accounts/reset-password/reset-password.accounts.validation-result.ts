import { IValidationResult } from '../../common/interfaces/validation-result.interface';

export class ResetPasswordAccountsValidationResult implements IValidationResult {
  public isValid: boolean;  
  public errors: string[] = [];
}