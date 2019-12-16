import { AccountEntity } from './model';
import { AccountsDataEntityMapper } from './accounts.data-entity.mapper';
import { Account, IRepository } from '@btcp/bootcamp-entities';
import { Connection, Repository, MoreThanOrEqual } from 'typeorm';

export class AccountRepository implements IRepository<string, Account> {
  private _repository: Repository<AccountEntity>;
  
  constructor(connection: Connection) {
    this._repository = connection.getRepository(AccountEntity);
  }

  async create(entity: Partial<Account>): Promise<Account> {
    return await this._repository.create(entity);
  }

  public async getAll(): Promise<Account[]> {
    return await this._repository.find()
        .then(items => items.map( e => new AccountsDataEntityMapper().mapFrom(e)));
  }
  public async get(id: string): Promise<Account> {
    return await this._repository.findOne(id)
        .then(e => new AccountsDataEntityMapper().mapFrom(e));
  }
  public async getByQuery(query: object): Promise<Account> {
    return await this._repository.findOne(query)
        .then(e => e ? new AccountsDataEntityMapper().mapFrom(e) : null);
  }
  public async getByVerification(verification: string): Promise<Account> {
    return await this._repository.findOne({
      verification, 
      verified: false, 
      verificationExpires: MoreThanOrEqual(new Date())
    }).then(e => e ? new AccountsDataEntityMapper().mapFrom(e) : null);
  }
  public async save(entity: Account): Promise<Account> {
    return await this._repository.save(entity);
  }
  public async delete(id: string): Promise<boolean> {
    return await this._repository.delete(id)
        .then(deleteResult => deleteResult.affected > 0);
  }
}
