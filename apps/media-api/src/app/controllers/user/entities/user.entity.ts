import { IsEmail, Min } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Entity, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { BcBaseEntity, BcEntity } from '../../../core';
import { bcRoles, BcRolesType, BC_ROLES } from '@core-lib';
import { hash } from 'bcrypt';

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
}
