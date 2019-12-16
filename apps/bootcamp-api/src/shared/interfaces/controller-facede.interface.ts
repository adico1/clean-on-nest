import { IControllerFactory } from './controller-factory.interface';
import { IRequestMessage } from 'libs/bootcamp-businesslogic/src/lib/common/interfaces/request-message.interface';

export abstract class IControllerFacede<T extends IRequestMessage> {
  protected _factory: IControllerFactory<T>;

  constructor(factory: IControllerFactory<T>) {
    this._factory = factory;
  }


}
