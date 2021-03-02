import { BcBaseEntity } from '@api';
import { ObjectId } from 'mongodb';
import { Column, Entity } from 'typeorm';

@Entity()
export class PlaylistItem extends BcBaseEntity<PlaylistItem> {
  @Column()
  mediaId: ObjectId;

  @Column()
  userId: ObjectId;

  @Column()
  playlistId: ObjectId;
}
