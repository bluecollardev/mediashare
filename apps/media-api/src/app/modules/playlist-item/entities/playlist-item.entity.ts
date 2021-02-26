import { BcBaseEntity } from '@api';
import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class PlaylistItem extends BcBaseEntity<PlaylistItem> {
  @ObjectIdColumn()
  mediaId: ObjectId;

  @ObjectIdColumn()
  userId: ObjectId;

  @ObjectIdColumn()
  playlistId: ObjectId[];
}
