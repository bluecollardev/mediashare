import { UserInterface } from '@core-lib';
import { ObjectId } from 'mongodb';
import { Entity, Column } from 'typeorm';
import { BcBaseEntity } from '../../../core';
export class BaseUser {}
@Entity()
export class User extends BcBaseEntity<User> implements UserInterface {
  @Column() username: string;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ array: true, nullable: true }) sharedPlaylists?: ObjectId[];
  @Column({ array: true, nullable: true }) sharedMediaItems?: ObjectId[];
}
