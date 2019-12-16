export interface IRepository<TIdType, TType> {
  create(entity: Partial<TType>): Promise<TType>;
  getAll(): Promise<TType[]>;
  get(id: TIdType): Promise<TType>;
  getByQuery(query: object);
  save(entity: TType): Promise<TType>;
  delete(id: TIdType): Promise<boolean>;
}