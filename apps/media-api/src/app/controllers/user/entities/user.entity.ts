import { BcBaseEntity } from 'apps/media-api/src/core/entities/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Playlist } from '../../playlist/entities/playlist.entity';

@Entity()
export class User extends BcBaseEntity<User> {
  @Column() username: string;
  @OneToMany(() => Playlist, (playlist) => playlist.user) playlists: Playlist[];

  constructor(user?: Partial<User>) {
    super(user);
  }
}
