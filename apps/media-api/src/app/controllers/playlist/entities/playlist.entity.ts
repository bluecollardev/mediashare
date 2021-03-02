import { BcBaseEntity } from '@api';
import { PlaylistInterface } from '@core-lib';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';

@Entity()
export class Playlist extends BcBaseEntity<Playlist> implements PlaylistInterface {
  @Column()
  title: string;

  @ObjectIdColumn()
  userId: ObjectId;

  @Column(() => PlaylistItem)
  items: PlaylistItem[];
}
