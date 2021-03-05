import { BcBaseEntity } from '@api';
import { ApiObjectId } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class PlaylistItem extends BcBaseEntity<PlaylistItem> {
  @Column()
  @ApiObjectId()
  mediaId: ObjectId;

  @Column()
  @ApiObjectId()
  @Index('userId')
  userId: ObjectId;

  @Column()
  @Index('playlistId')
  playlistId: ObjectId;
}
