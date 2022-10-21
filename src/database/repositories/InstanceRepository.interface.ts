import { Instance, InstanceApplications, Whitelabel } from '../../schema';
import { CommonRepositoryInterface } from './CommonRepository.interface';

export interface IInstanceRepositoryFindByNameParams {
  name: Whitelabel;
  application: InstanceApplications;
}

export interface InstanceRepositoryInterface extends  CommonRepositoryInterface<Instance> {
  findByName(params: IInstanceRepositoryFindByNameParams): Promise<Instance | undefined>;
}