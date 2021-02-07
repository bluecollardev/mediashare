import { PlaylistItem } from './playlistItemTypes';
import { Tag } from './tag';
import { Stats } from './stats';

export interface Playlist {
  id?: string;
  title?: string;
  items?: PlaylistItem[];
  readonly itemCount?: number; // Computed
  tags?: Tag[];
  stats?: Partial<Stats>[]
}
