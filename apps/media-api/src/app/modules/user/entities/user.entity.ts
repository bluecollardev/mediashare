import { Entity, Column, OneToMany } from 'typeorm';
import { ObjectId } from 'mongodb';
import { BcEntity } from '@api-core/entities/base.entity';
import { BcRolesType, BC_ROLES } from '@core-lib';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User extends BcEntity {
  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  phoneNumber: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  sub: string;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column()
  imageSrc: string;

  /* @ApiProperty({ isArray: true, nullable: true})
  @Column({ array: true, nullable: true }) sharedPlaylists?: ObjectId[];

  @ApiProperty({ isArray: true, nullable: true})
  @Column({ array: true, nullable: true}) sharedMediaItems?: ObjectId[]; */

  @ApiProperty()
  @Column({ enum: BC_ROLES, name: 'role', enumName: 'BcRolesType' })
  role: BcRolesType;

  @ApiProperty({ type: () => ShareItem, isArray: true, nullable: true })
  @OneToMany(() => ShareItem, (shareItem) => shareItem.userId)
  @Column({ array: true, nullable: true })
  shareItem?: ShareItem[];
}
