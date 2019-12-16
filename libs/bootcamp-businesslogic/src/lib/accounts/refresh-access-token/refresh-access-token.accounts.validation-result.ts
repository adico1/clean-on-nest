import { IValidationResult } from '../../common/interfaces/validation-result.interface';

export class RefreshAccessTokenAccountsValidationResult implements IValidationResult {
  public isValid: boolean;  
  public errors: string[] = [];
}