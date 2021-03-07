import { BcBaseEntity } from '@api';
import { ApiObjectId } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class PlaylistItem extends BcBaseEntity<PlaylistItem> {
  @Column()
  @ApiObjectId()
  @Index('mediaId')
  mediaId: ObjectId;

  @Column()
  @ApiObjectId()
  @Index('userId', { unique: false })
  userId: ObjectId;

  @Column()
  @Index('playlistId', { unique: false })
  playlistId: ObjectId;

  @Column()
  sortIndex: number;
}
