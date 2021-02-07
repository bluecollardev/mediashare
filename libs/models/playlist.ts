import { LibraryItem } from './libraryItemTypes';
import { Tag } from './tag';
import { Stats } from './stats';

export interface Playlist {
  id?: string;
  title?: string;
  items?: LibraryItem[];
  readonly itemCount?: number; // Computed
  tags?: Tag[];
  stats?: Partial<Stats>[]
}
