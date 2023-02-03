import { User, SystemTag } from '../../schema';
import { ICommonRepository } from './commonRepository.interface';

export interface IUserRepository extends ICommonRepository<User> {
  findByEmail(email: string): Promise<User | undefined>;
  findByTags(
    type: string,
    tags: string[] | SystemTag
  ): Promise<User[] | undefined>;
}