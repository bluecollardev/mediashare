import { MSBaseEntity } from 'apps/media-api/src/core/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('users')
export class User extends MSBaseEntity<User> {
  @Column() username: string;

  constructor(user?: Partial<User>) {
    super(user);
  }
}
