export interface ICommonRepositoryFindAllParams {
  limit?: number;
  offset?: number;
}

export interface ICommonRepository<T> {
  findAll(params: ICommonRepositoryFindAllParams): Promise<T[]>;
  findById(id: string): Promise<T | undefined>;
  create(id: string, params: T): Promise<T>;
  update(id: string, entityData: T): Promise<T>;
  delete(id: string): Promise<void>;
}