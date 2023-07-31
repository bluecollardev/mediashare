import { AutoMap } from '@automapper/classes';
import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ApiBaseEntity } from '@mediashare/core/entities/base.entity';
import { BcRolesType, BC_ROLES } from '../../../core/models';

@Entity('user')
export class User extends ApiBaseEntity {
  @AutoMap()
  @ApiProperty()
  @Column({ nullable: false })
  sub: string;

  @AutoMap()
  @ApiProperty()
  @Column({ nullable: false })
  username: string;

  @AutoMap()
  @ApiProperty()
  @Column({ nullable: false })
  email: string;

  @AutoMap()
  @ApiProperty()
  @Column({ nullable: false })
  firstName: string;

  @AutoMap()
  @ApiProperty()
  @Column({ nullable: false })
  lastName: string;

  @AutoMap()
  @ApiProperty()
  @Column({ nullable: true })
  phoneNumber: string;

  @AutoMap()
  @ApiProperty()
  @Column({ nullable: true })
  isDisabled: boolean;

  @AutoMap()
  @ApiProperty()
  @Column({ nullable: true })
  transactionId: string;

  @AutoMap()
  @ApiProperty()
  @Column({ nullable: true })
  transactionDate: string;

  @AutoMap()
  @ApiProperty()
  @Column({ nullable: true })
  transactionEndDate: string;

  @AutoMap()
  @ApiProperty()
  @Column({ nullable: true })
  imageSrc: string;

  /*
  @AutoMap()
  @ApiProperty({ isArray: true, nullable: true})
  @Column({ array: true, nullable: true }) sharedPlaylists?: ObjectId[];

  @AutoMap()
  @ApiProperty({ isArray: true, nullable: true})
  @Column({ array: true, nullable: true}) sharedMediaItems?: ObjectId[]; */

  @AutoMap()
  @ApiProperty()
  @Column({ enum: BC_ROLES, name: 'role', enumName: 'BcRolesType' })
  role: BcRolesType;

  /*
  @AutoMap()
  @ApiProperty({ type: () => ShareItem, isArray: true, nullable: true })
  @OneToMany(() => ShareItem, (shareItem) => shareItem.userId)
  @Column({ array: true, nullable: true })
  shareItem?: ShareItem[];*/
}
