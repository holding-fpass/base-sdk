import { Instance, InstanceApplications } from '../../schema';
import { ICommonRepository } from './ICommonRepository';

export interface IInstanceRepositoryFindByNameParams {
  name: string;
  application: InstanceApplications;
}

export interface IInstanceRepository extends  ICommonRepository<Instance> {
  findByName(params: IInstanceRepositoryFindByNameParams): Promise<Instance | undefined>;
}