import { BcBaseEntity } from '@api';
import { ObjectId } from 'mongodb';
import { Column, Entity } from 'typeorm';
import { Playlist } from '../../playlist/entities/playlist.entity';

@Entity()
export class PlaylistItem extends BcBaseEntity<PlaylistItem> {
  @Column()
  mediaId: ObjectId;
}
