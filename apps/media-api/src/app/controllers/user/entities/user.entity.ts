import { BcBaseEntity } from 'apps/media-api/src/core/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends BcBaseEntity<User> {
  @Column() username: string;

  constructor(user?: Partial<User>) {
    super(user);
  }
}
