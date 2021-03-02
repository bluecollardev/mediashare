import { User } from '@core-lib';
import { ObjectId } from 'mongodb';
import { Entity, Column } from 'typeorm';
import { BcBaseEntity } from '../../../core';
import { CreateUserDto } from '../dto/create-user.dto';
export class BaseUser {}
@Entity()
export class UserEntity extends BcBaseEntity<UserEntity> implements User {
  @Column() username: string;
  @Column() firstName: string;
  @Column() lastName: string;

  @Column({ array: true }) sharedPlaylists?: ObjectId[];

  @Column({ array: true }) sharedMediaItems?: ObjectId[];
  constructor(user: CreateUserDto) {
    super();
    const { username, firstName, lastName } = user || {};
    this.username = username;
    this.lastName = firstName;
    this.lastName = lastName;
  }
}
