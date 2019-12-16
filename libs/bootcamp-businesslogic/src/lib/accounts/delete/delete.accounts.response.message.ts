import { IResponseMessage } from '../../common/interfaces/response-message.interface';
import { IValidationResult } from '../../common/interfaces/validation-result.interface';

export class DeleteAccountsResponseMessage implements IResponseMessage {
  private readonly _validationResult: IValidationResult;
  private readonly _response: boolean;

  constructor(validationResult: IValidationResult, response: boolean = false) {
    this._validationResult = validationResult;
    this._response = response;
  }

  public get validationResult(): IValidationResult {
    return this._validationResult;
  }

  public get response(): boolean {
    return this._response;
  }
}
