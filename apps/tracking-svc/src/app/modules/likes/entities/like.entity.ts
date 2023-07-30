import { ApiObjectId } from '@mediashare/shared';
import { Column, Entity, Index } from 'typeorm';
import { ObjectId } from 'mongodb';
import { ApiBaseEntity } from '@mediashare/core/entities/base.entity';

@Entity('like_item')
export class Like extends ApiBaseEntity {
  @ApiObjectId()
  @Column({ name: 'playlistId', unique: false })
  @Index('playlistId', { unique: false })
  playlistId: ObjectId;

  @ApiObjectId()
  @Column({ name: 'mediaId', unique: false })
  @Index('mediaId')
  mediaId: ObjectId;
}
