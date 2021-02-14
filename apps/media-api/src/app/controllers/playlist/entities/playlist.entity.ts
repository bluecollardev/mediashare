import { BcBaseEntity } from '@api';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PlaylistItem } from '../../playlist-item/entities/playlist-item.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Playlist extends BcBaseEntity<Playlist> {
  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.playlists) user: User;

  @OneToMany(() => PlaylistItem, (playlistItem) => playlistItem.playlist)
  items: Playlist[];
  // items;

  // itemCount;
  // tags;
  // stats;
  // userId;
}
