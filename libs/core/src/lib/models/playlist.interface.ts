import { IdType } from '../types/id.type';
import { BcBaseInterface } from './bc-base.interface';
import { PlaylistCategoryType } from '../../';

export interface PlaylistInterface extends BcBaseInterface {
  title: string;
  userId: IdType;

  category: PlaylistCategoryType;
}
