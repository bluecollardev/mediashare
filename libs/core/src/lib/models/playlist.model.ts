import { PlaylistItem } from './playlistItem.model';
import { Tag } from './tag.model';
import { Stats } from './stats.model';

export interface Playlist {
  id?: string;
  title?: string;
  items: PlaylistItem[];
  itemCount?: () => number; // Computed
  tags?: Tag[];
  stats?: Partial<Stats>[];
  userId: string;
}
