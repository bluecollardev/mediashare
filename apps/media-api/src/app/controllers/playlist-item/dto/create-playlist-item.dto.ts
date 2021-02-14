import { DeepPartial } from 'apps/media-api/src/core';
import { ObjectId } from 'bson';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { Playlist } from '../../playlist/entities/playlist.entity';
import { PlaylistItem } from '../entities/playlist-item.entity';

export class CreatePlaylistItemDto
  implements Omit<PlaylistItem, '_id' | 'factory'> {
  playlist: Playlist;
  mediaItems: MediaItem[];
  _id: ObjectId;
}
