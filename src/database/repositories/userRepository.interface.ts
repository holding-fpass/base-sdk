import { User } from '../../schema';
import { ICommonRepository } from './commonRepository.interface';

export interface IUserRepository extends ICommonRepository<User> {
  findByEmail(email: string): Promise<User | undefined>;
}