import { IRequestMessage } from './request-message.interface';
import { IResponseMessage } from './response-message.interface';

export interface IRequestHandler<
TRequest extends IRequestMessage<IResponseMessage>, 
TResponse extends IResponseMessage> {
  handle(request: TRequest): Promise<TResponse>
}