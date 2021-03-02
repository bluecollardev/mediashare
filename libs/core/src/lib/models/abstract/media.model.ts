import { Stats } from '../stats.model';
import { Tag } from '../tag.model';
import { IdType } from '../../types/id.type';
import { BcBaseInterface } from '../bc-base.model';

export interface Media extends BcBaseInterface {
  displayFileName: string;
  userId: IdType;
  isPlayable: boolean;
  thumbnail?: string;
  uri: string;
  tags?: Tag[];
  stats?: Stats;
  summary: string;
  description: string;
  title: string;
}
