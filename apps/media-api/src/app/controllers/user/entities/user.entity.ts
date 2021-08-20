import { IsEmail, Min } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Entity, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { BcBaseEntity, BcEntity } from '../../../core';
import { bcRoles, BcRolesType, BC_ROLES } from '@core-lib';
import { hash } from 'bcrypt';

@Entity()
export class User extends BcEntity {
  @Column() username: string;

  @Column() firstName: string;
  @Column() lastName: string;

  @Column({ nullable: true })
  @Min(8)
  password?: string;
  @Column({ array: true, nullable: true }) sharedPlaylists?: ObjectId[];
  @Column({ array: true, nullable: true }) sharedMediaItems?: ObjectId[];

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await hash(this.password, 10);
  // }

  // @Column('enum', { default: [bcRoles.guest], array: true, enum: BC_ROLES })
  // roles: BcRolesType[];
  // @Column()
  // @IsEmail()
  // email: string;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;
}
