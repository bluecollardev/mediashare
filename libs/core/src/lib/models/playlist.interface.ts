import { TagInterface } from './tag.model';
import { Stats } from './stats.model';
import { IdType } from '../types/id.type';
import { BcBaseInterface } from './bc-base.interface';
import { PlaylistItemInterface } from './playlistItem.interface';

export interface PlaylistInterface extends BcBaseInterface {
  title: string;
  userId: IdType;
  items: PlaylistItemInterface[];
  /* TODO: category */
  // itemCount?: () => number; // Computed
  // tags?: Tag[];
  // stats?: Partial<Stats>[];
}
