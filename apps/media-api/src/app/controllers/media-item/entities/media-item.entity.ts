import { Media } from 'apps/media-api/src/core/entities/media.entity';
import { Tag } from 'apps/media-api/src/core/entities/tag.entity';
import { ObjectId } from 'mongodb';
import { Column, Entity, OneToMany } from 'typeorm';
import { PlaylistItem } from '../../playlist-item/entities/playlist-item.entity';

@Entity()
export class MediaItem extends Media {
  @Column()
  isPlayable: boolean;
  @Column() summary: string;
  @Column() description: string;
  @Column() tags: Tag[];
  @Column() userId: ObjectId;
  @OneToMany(() => PlaylistItem, (playlistItem) => playlistItem.mediaItems)
  playlistItems: PlaylistItem[];
}
