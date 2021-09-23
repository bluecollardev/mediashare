import { ObjectId } from 'mongodb';
import { Entity, Column } from 'typeorm';
import { BcEntity } from '../../../core';
export type UserRoleType = 'admin' | 'user';
@Entity()
export class User extends BcEntity {
  @Column() username: string;
  @Column() phoneNumber: string;
  @Column() email: string;
  @Column() sub: string;

  @Column() firstName: string;
  @Column() lastName: string;
  @Column() imageSrc: string;

  @Column({ array: true, nullable: true }) sharedPlaylists?: ObjectId[];
  @Column({ array: true, nullable: true }) sharedMediaItems?: ObjectId[];
  @Column() role: UserRoleType;
}
