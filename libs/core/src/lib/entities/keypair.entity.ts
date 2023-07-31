import { ApiBaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class KeyPair<T> extends ApiBaseEntity {
  @Column() key: string;
  @Column() value: T;
}
