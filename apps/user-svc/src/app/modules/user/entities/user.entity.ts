import { AutoMap } from '@automapper/classes';
import { Entity, Column, BeforeInsert } from 'typeorm';
import { ApiBaseEntity } from '@mediashare/core/entities/base.entity';
import { BcRolesType, BC_ROLES } from '../../../core/models';

@Entity('user')
export class User extends ApiBaseEntity {
  @AutoMap()
  @Column({ nullable: false })
  sub: string;

  @AutoMap()
  @Column({ nullable: false })
  username: string;

  @AutoMap()
  @Column({ nullable: false })
  email: string;

  @AutoMap()
  @Column({ nullable: false })
  firstName: string;

  @AutoMap()
  @Column({ nullable: false })
  lastName: string;

  @AutoMap()
  @Column({ nullable: true })
  phoneNumber: string;

  @AutoMap()
  @Column({ nullable: true })
  imageSrc: string;

  @AutoMap()
  @Column({
    enum: BC_ROLES,
    name: 'role',
    enumName: 'BcRolesType',
    nullable: true,
  })
  role: BcRolesType;

  @AutoMap()
  @Column({ nullable: true })
  isDisabled: boolean;

  @AutoMap()
  @Column({ nullable: true })
  transactionId: string;

  @AutoMap()
  @Column({ nullable: true })
  transactionDate: string;

  @AutoMap()
  @Column({ nullable: true })
  transactionEndDate: string;

  /* @AutoMap()
  @Column({ array: true, nullable: true }) sharedPlaylists: ObjectId[];

  @AutoMap()
  @Column({ array: true, nullable: true}) sharedMediaItems: ObjectId[];

  @AutoMap()
  @OneToMany(() => ShareItem, (shareItem) => shareItem.userId)
  @Column({ array: true, nullable: true })
  shareItem: ShareItem[];*/

  @BeforeInsert()
  setCreatedBy() {
    // TODO: Use a db trigger
    // this.createdBy = new ObjectId();
  }
}
