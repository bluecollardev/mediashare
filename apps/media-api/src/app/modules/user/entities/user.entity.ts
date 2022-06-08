import { Entity, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { BcEntity } from '@api-core/entities/base.entity';
import { BcRolesType, BC_ROLES } from '@core-lib';

@Entity('user')
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

  @Column({ enum: BC_ROLES, name: 'role', enumName: 'BcRolesType' }) role: BcRolesType;
}
