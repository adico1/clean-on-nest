import { IResponseMessage } from '../../common/interfaces/response-message.interface';
import { IValidationResult } from '../../common/interfaces/validation-result.interface';
import { Account } from '@btcp/bootcamp-entities';

export class PutAccountsResponseMessage implements IResponseMessage {
  private readonly _validationResult: IValidationResult;
  private readonly _response: Account;

  constructor(validationResult: IValidationResult, response: Account = null) {
    this._validationResult = validationResult;
    this._response = response;
  }

  public get validationResult(): IValidationResult {
    return this._validationResult;
  }

  public get response(): Account {
    return this._response;
  }
}
