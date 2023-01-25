import { Measurement, ResourceType } from '../../../schema';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface IMeasurementFirestoreRepositoryConstructorParams extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {}

export class MeasurementFirestoreRepository extends CommonFirestoreRepository<Measurement> {
  public constructor(params: IMeasurementFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.MEASUREMENT,
    };

    super(superParams);
  }
}
