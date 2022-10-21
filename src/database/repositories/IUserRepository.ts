import { User } from '../../schema';
import { ICommonRepository } from './ICommonRepository';

export interface IUserRepository extends  ICommonRepository<User> {
  findByEmail(email: string): Promise<User | undefined>;
}