import { IResponseMessage } from '../../common/interfaces/response-message.interface';
import { IValidationResult } from '../../common/interfaces/validation-result.interface';
import { Account, LoginInfo } from '@btcp/bootcamp-entities';

export class VerifyEmailAccountsResponseMessage implements IResponseMessage {
  private readonly _validationResult: IValidationResult;
  private readonly _response: LoginInfo;

  constructor(validationResult: IValidationResult, response: LoginInfo = null) {
    this._validationResult = validationResult;
    this._response = response;
  }

  public get validationResult(): IValidationResult {
    return this._validationResult;
  }

  public get response(): LoginInfo {
    return this._response;
  }
}
