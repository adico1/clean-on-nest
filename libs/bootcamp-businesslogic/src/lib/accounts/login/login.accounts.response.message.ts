import { IResponseMessage } from '../../common/interfaces/response-message.interface';
import { IValidationResult } from '../../common/interfaces/validation-result.interface';
import { LoginToken } from '@btcp/bootcamp-entities';

export class LoginAccountsResponseMessage implements IResponseMessage {
  private readonly _validationResult: IValidationResult;
  private readonly _response: LoginToken;

  constructor(validationResult: IValidationResult, response: LoginToken = null) {
    this._validationResult = validationResult;
    this._response = response;
  }

  public get validationResult(): IValidationResult {
    return this._validationResult;
  }

  public get response(): LoginToken {
    return this._response;
  }
}
