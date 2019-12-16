import { IAccount } from './account.interface';

export abstract class AccountsGateway {
  public abstract async findAll(): Promise<IAccount[]>;
}