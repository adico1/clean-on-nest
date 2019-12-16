import { IResponseMessage } from '../../common/interfaces/response-message.interface';
import { IValidationResult } from '../../common/interfaces/validation-result.interface';
import { VerificationToken } from '@btcp/bootcamp-entities';

export class ResetPasswordAccountsResponseMessage implements IResponseMessage {
  private readonly _validationResult: IValidationResult;
  private readonly _response: VerificationToken;

  constructor(validationResult: IValidationResult, response: VerificationToken = null) {
    this._validationResult = validationResult;
    this._response = response;
  }

  public get validationResult(): IValidationResult {
    return this._validationResult;
  }

  public get response(): VerificationToken {
    return this._response;
  }
}
