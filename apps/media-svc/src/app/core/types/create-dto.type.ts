import { ApiBaseEntity } from '@mediashare/core/entities/base.entity';

export type CreateDtoType<E extends ApiBaseEntity> = Omit<E, '_id' | 'factory'>;
