import { BcBaseEntity } from '@api';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';

@Entity()
export class Playlist extends BcBaseEntity<Playlist> {
  @Column()
  title: string;

  @ObjectIdColumn()
  userId: ObjectId;

  @Column(() => PlaylistItem)
  items: PlaylistItem[];
}
