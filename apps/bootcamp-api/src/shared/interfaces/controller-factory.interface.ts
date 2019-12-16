import { Connection } from 'typeorm';
import { Response } from 'express';
import { IRequestMessage } from 'libs/bootcamp-businesslogic/src/lib/common/interfaces/request-message.interface';

export abstract class IControllerFactory<T extends IRequestMessage> {
  protected _connection: Connection;
  protected _res: Response;

  constructor(connection: Connection, res: Response) {
    this._connection = connection;
    this._res = res;
  }

  public abstract create(): T
}
