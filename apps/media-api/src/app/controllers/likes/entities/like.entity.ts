import { ApiObjectId } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index } from 'typeorm';
import { BcEntity } from '../../../core/entities/base.entity';

@Entity('like_item')
export class Like extends BcEntity {
  @Column({ name: 'playlistId', unique: false })
  @ApiObjectId()
  @Index('playlistId', { unique: false })
  playlistId: ObjectId;

  @Column({ name: 'mediaId', unique: false })
  @ApiObjectId()
  @Index('mediaId')
  mediaId: ObjectId;
}
