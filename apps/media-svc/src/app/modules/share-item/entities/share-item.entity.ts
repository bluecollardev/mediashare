import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { ApiDecoratorOptions, ApiObjectId, ApiString } from '@mediashare/shared';
import { IsBoolean } from 'class-validator';
import { ObjectId } from 'mongodb';
import { ApiBaseEntity } from '@mediashare/core/entities/base.entity';
// import { User } from '../user/entities/user.entity';

@Entity('share_item')
export class ShareItem extends ApiBaseEntity {
  @ApiObjectId(<ApiDecoratorOptions>{ readOnly: true })
  @Column({ name: 'userId' })
  @Index('userId', { unique: false })
  userId: ObjectId;

  @ApiObjectId(<ApiDecoratorOptions>{ required: false })
  @Column('playlistId')
  @Index('playlistId', { unique: false })
  playlistId: ObjectId;

  @ApiObjectId(<ApiDecoratorOptions>{ required: false })
  @Column({ name: 'mediaId', unique: false })
  @Index('mediaId')
  mediaId: ObjectId;

  @IsBoolean()
  @Column({ name: 'read', unique: false })
  read: boolean;

  @ApiString()
  @Column({ name: 'title', unique: false })
  title: string;

  // @ManyToOne(() => User, (user) => user.shareItem)
  @Column({ name: 'owner', unique: false })
  owner: any; // User;
}
