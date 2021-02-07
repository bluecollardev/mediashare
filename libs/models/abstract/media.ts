import { Metadata } from './metadata';
import { Stats } from '../stats';
import { Tag } from '../tag';

export interface Media extends Metadata {
  id?: string;
  displayFileName?: string;
  filePath?: string;
  fileType?: string;
  mimeType?: string;
  isPlayable: boolean;
  previewImagePath?: string;
  // feedType?: string; // Not sure if we need this
  title?: string;
  summary?: string; // Character limited description
  description?: string; // Rich text
  tags?: Tag[];
  stats?: Stats;
}
