import { User } from '../../schema';
import { CommonRepositoryInterface } from './CommonRepository.interface';

export interface UserRepositoryInterface extends  CommonRepositoryInterface<User> {
  findByEmail(email: string): Promise<User | undefined>;
}