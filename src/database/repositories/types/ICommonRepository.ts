export interface ICommonRepositoryFindAllParams {
  limit?: number;
  offset?: number;
}

export interface ICommonRepository {
  findAll<T = unknown>(params: ICommonRepositoryFindAllParams): Promise<T[]>;
  findById<T = unknown>(id: string): Promise<T>;
  create<T = unknown>(id: string, params: T): Promise<T>;
  update<T = unknown>(id: string, entityData: T): Promise<T>;
  delete(id: string): Promise<void>;
}