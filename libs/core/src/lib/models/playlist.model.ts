import { PlaylistItem } from './playlistItem.model';
import { Tag } from './tag.model';
import { Stats } from './stats.model';
import { BcBaseInterface } from './bc-base.model';
import { IdType } from '../types/id.type';

export interface Playlist extends BcBaseInterface {
  title: string;
  userId: IdType;
  items: IdType;
  /* TODO: category */
  // itemCount?: () => number; // Computed
  // tags?: Tag[];
  // stats?: Partial<Stats>[];
}
