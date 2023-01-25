import { Mfa } from '../../schema';
import { ICommonRepository } from './commonRepository.interface';

export interface IMFARepositoryFindByCodeParams {
  machineId: string;
  code: string;
}

export interface IMFARepository extends ICommonRepository<Mfa> {
  findByCode(params: IMFARepositoryFindByCodeParams): Promise<Mfa | undefined>;
}