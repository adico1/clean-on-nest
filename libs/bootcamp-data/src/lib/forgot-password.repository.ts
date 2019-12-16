import { ForgotPasswordEntity } from './model';
import { ForgotPasswordsDataEntityMapper } from './forgot-password.data-entity.mapper';
import { ForgotPasswordsEntityDataMapper } from './forgot-password.entity-data.mapper';
import { ForgotPassword, IRepository } from '@btcp/bootcamp-entities';
import { Connection, Repository, MoreThanOrEqual } from 'typeorm';

export class ForgotPasswordRepository implements IRepository<string, ForgotPassword> {
  private _repository: Repository<ForgotPasswordEntity>;
  
  constructor(connection: Connection) {
    this._repository = connection.getRepository(ForgotPasswordEntity);
  }

  async create(entity: ForgotPassword): Promise<ForgotPassword> {
    const entityTemp = new ForgotPasswordsEntityDataMapper().mapFrom(entity)
    return await this._repository.create(entity);
  }
  public async getAll(): Promise<ForgotPassword[]> {
    return await this._repository.find()
        .then(items => (items && items.length) ? 
          items.map( e => new ForgotPasswordsDataEntityMapper().mapFrom(e)) : null );
  }
  public async get(id: string): Promise<ForgotPassword> {
    return await this._repository.findOne(id)
        .then(e => e ? new ForgotPasswordsDataEntityMapper().mapFrom(e) : null);
  }
  public async getByQuery(query: object): Promise<ForgotPassword> {
    return await this._repository.findOne(query)
        .then(e => e ? new ForgotPasswordsDataEntityMapper().mapFrom(e) : null);
  }
  public async getByVerification(verification: string): Promise<ForgotPassword> {
    return await this._repository.findOne({
      verification: verification,
      firstUsed: false,
      finalUsed: false,
      expires: MoreThanOrEqual(new Date()),
    })
    .then(e => e ? new ForgotPasswordsDataEntityMapper().mapFrom(e) : null);
  }
  public async getByEmail(email: string): Promise<ForgotPassword> {
    return await this._repository.findOne({
      email: email,
      firstUsed: true,
      finalUsed: false,
      expires: MoreThanOrEqual(new Date())
    })
    .then(e => e ? new ForgotPasswordsDataEntityMapper().mapFrom(e) : null);
  }
  public async save(entity: ForgotPassword): Promise<ForgotPassword> {
    return await this._repository.save(entity);
  }
  public async delete(id: string): Promise<boolean> {
    return await this._repository.delete(id)
        .then(deleteResult => deleteResult.affected > 0);
  }
}
