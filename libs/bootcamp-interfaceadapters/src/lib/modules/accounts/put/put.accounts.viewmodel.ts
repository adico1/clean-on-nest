import { Account } from '@btcp/bootcamp-entities';
import { IViewModel } from '../../../common/view-model.interface';

export class PutAccountsViewModel implements IViewModel {
  constructor( account: Account ) {
    this.id = account.id;
    this.firstName = account.firstName;
    this.email = account.email;
    this.lastName = account.lastName;
    this.roles = [...account.roles];
  }

  public id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public roles: string[];
}