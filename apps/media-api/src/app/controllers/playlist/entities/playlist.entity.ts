import { BcBaseEntity } from '@api';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { PlaylistItem } from './playlist-item.entity';

@Entity()
export class Playlist extends BcBaseEntity<Playlist> {
  @Column()
  title: string;

  @ObjectIdColumn()
  user: ObjectId;

  @Column((type) => PlaylistItem)
  items: Playlist[];
  // items;

  // itemCount;
  // tags;
  // stats;
  // userId;
}
