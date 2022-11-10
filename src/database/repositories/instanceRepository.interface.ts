import { Instance, InstanceApplications, Whitelabel } from "../../schema";
import { ICommonRepository } from "./commonRepository.interface";

export interface IInstanceRepositoryFindByNameParams {
  name: Whitelabel;
  application: InstanceApplications;
}

export interface IInstanceRepository extends ICommonRepository<Instance> {
  findByName(
    params: IInstanceRepositoryFindByNameParams
  ): Promise<Instance | undefined>;
  findByFqdn(fqdn: string): Promise<Instance | undefined>;
}
