import { IValidationResult } from '../../common/interfaces/validation-result.interface';

export class DeleteAccountsValidationResult implements IValidationResult {
  public isValid: boolean;  
  public errors: string[] = [];
}