import { BcBaseEntity } from '@api';
import { ObjectId } from 'mongodb';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { Playlist } from '../../playlist/entities/playlist.entity';

@Entity()
export class PlaylistItem extends BcBaseEntity<PlaylistItem> {
  @ManyToOne(() => Playlist, (playlist) => playlist.items)
  playlist: Playlist;

  @ManyToOne(() => MediaItem, (mediaItem) => mediaItem.playlistItems)
  mediaItems: MediaItem[];
}
