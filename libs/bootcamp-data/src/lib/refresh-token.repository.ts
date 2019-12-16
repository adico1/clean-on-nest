import { RefreshTokenEntity } from './model';
import { RefreshTokensDataEntityMapper } from './refresh-token.data-entity.mapper';
import { RefreshToken, IRepository } from '@btcp/bootcamp-entities';
import { Connection, Repository } from 'typeorm';

export class RefreshTokenRepository implements IRepository<string, RefreshToken> {
  private _repository: Repository<RefreshTokenEntity>;
  
  constructor(connection: Connection) {
    this._repository = connection.getRepository(RefreshTokenEntity);
  }

  async create(entity: Partial<RefreshToken>): Promise<RefreshToken> {
    return await this._repository.create(entity);
  }
  
  public async getAll(): Promise<RefreshToken[]> {
    return await this._repository.find()
        .then(items => 
          (items && items.length) ? 
          items.map( e => new RefreshTokensDataEntityMapper().mapFrom(e)): null);
  }
  public async get(id: string): Promise<RefreshToken> {
    return await this._repository.findOne(id)
        .then(e => e ? new RefreshTokensDataEntityMapper().mapFrom(e) : null);
  }
  public async getByQuery(query: object): Promise<RefreshToken> {
    return await this._repository.findOne(query)
        .then(e => e ? new RefreshTokensDataEntityMapper().mapFrom(e) : null);
  }
  public async save(entity: RefreshToken): Promise<RefreshToken> {
    return await this._repository.save(entity);
  }
  public async delete(id: string): Promise<boolean> {
    return await this._repository.delete(id)
        .then(deleteResult => deleteResult.affected > 0);
  }
}
