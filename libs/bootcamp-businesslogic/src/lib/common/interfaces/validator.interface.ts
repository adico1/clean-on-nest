import { IRequestMessage } from './request-message.interface';
import { IValidationResult } from './validation-result.interface';
import { IResponseMessage } from './response-message.interface';

export interface IValidator<
  TRequestMessage extends IRequestMessage<IResponseMessage>, 
  TValidationResult extends IValidationResult> {
    validate(request: TRequestMessage): TValidationResult;
}