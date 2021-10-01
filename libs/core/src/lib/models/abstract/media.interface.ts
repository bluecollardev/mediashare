import { Stats } from '../stats.model';
import { TagInterface } from '../tag.model';
import { IdType } from '../../types/id.type';
import { BcBaseInterface } from '../bc-base.interface';
import { MediaCategoryType } from '../../models';

export interface Media extends BcBaseInterface {
  displayFileName: string;
  userId: IdType;
  isPlayable: boolean;
  thumbnail?: string;
  uri: string;
  tags?: TagInterface[];
  stats?: Stats;
  summary: string;
  description: string;
  title: string;
  category: MediaCategoryType;
}
