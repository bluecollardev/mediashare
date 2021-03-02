import { IdType } from '../types/id.type';
import { BcBaseInterface } from './bc-base.interface';
import { PlaylistItemInterface } from './playlistItem.interface';
import { PlaylistCategoryType } from '../../';

export interface PlaylistInterface extends BcBaseInterface {
  title: string;
  userId: IdType;
  items: PlaylistItemInterface[];
  /* TODO: category */
  category: PlaylistCategoryType;
  // itemCount?: () => number; // Computed
  // tags?: Tag[];
  // stats?: Partial<Stats>[];
}
