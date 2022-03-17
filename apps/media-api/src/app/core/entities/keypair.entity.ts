import { BcBaseEntity } from '@api-core/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class KeyPair<T> extends BcBaseEntity<T> {
  @Column() key: string;
  @Column() value: T;
}
