import { Stats } from '../stats.model';

import { IdType } from '../../types';
import { BcBaseInterface } from '../bc-base.interface';
import { MediaVisibilityType } from '../../models';
import { TagInterface } from '../tag.model';

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
  visibility: MediaVisibilityType;
}
