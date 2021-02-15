import { Entity, Column } from 'typeorm';
import { BcBaseEntity } from '../../../core';
import { baseEntityMixin } from '../../../factories/with-entity.factory';
import { CreateUserDto } from '../dto/create-user.dto';
export class BaseUser {}
@Entity()
export class User extends BcBaseEntity<User> {
  @Column() username: string;
  @Column() firstName: string;
  @Column() lastName: string;
  constructor(user: CreateUserDto) {
    super();
    const { username, firstName, lastName } = user || {};
    this.username = username;
    this.lastName = firstName;
    this.lastName = lastName;
  }
}
