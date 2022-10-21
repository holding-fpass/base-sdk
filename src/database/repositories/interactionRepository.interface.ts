import { Interaction } from '../../schema';
import { ICommonRepository } from './commonRepository.interface';

export interface IInteractionRepositoryFindByContentView {
  startDate: Date;
  endDate: Date;
}

export interface IInteractionRepository extends ICommonRepository<Interaction> {
  findByContentView(params: IInteractionRepositoryFindByContentView): Promise<Interaction[]>;
}