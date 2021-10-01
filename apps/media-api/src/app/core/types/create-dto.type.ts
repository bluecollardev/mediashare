import { BcBaseEntity } from '../entities/base.entity';

export type CreateDtoType<E extends BcBaseEntity<E>> = Omit<
  E,
  '_id' | 'factory'
>;
