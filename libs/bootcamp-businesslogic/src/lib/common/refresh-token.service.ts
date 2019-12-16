import { IRepository, IService, RefreshToken } from '@btcp/bootcamp-entities';

export class RefreshTokenService implements IService {
  private readonly _repository: IRepository<string, RefreshToken>;
  
  constructor(repository) {
    this._repository = repository;
  }

  async save(refreshToken: RefreshToken) {
    return await this._repository.save(refreshToken); 
  }

  async findToken(token: string) {
    return await this._repository.getByQuery({refreshToken: token});
  }
}