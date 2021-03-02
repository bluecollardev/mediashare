import { Metadata } from './metadata.model';
import { Stats } from '../stats.model';
import { Tag } from '../tag.model';

export interface Media extends Metadata {
  id?: string;
  displayFileName?: string;
  userId: string;
  // filePath?: string;
  // fileType?: string;
  // mimeType?: string;
  isPlayable: boolean;
  previewImagePath?: string;
  uri: string;
  // feedType?: string; // Not sure if we need this
  title?: string;
  summary?: string; // Character limited description
  description?: string; // Rich text
  tags?: Tag[];
  stats?: Stats;
}
