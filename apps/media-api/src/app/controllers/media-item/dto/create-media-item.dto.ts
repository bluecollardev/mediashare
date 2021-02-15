import { ObjectId } from 'mongodb';
import { Tag } from '../../../core/entities/tag.entity';
import { MediaItem } from '../entities/media-item.entity';

export class CreateMediaItemDto
  implements
    Pick<MediaItem, 'summary' | 'isPlayable' | 'description' | 'userId'> {
  isPlayable: boolean;
  summary: string;
  description: string;
  userId: ObjectId;
  title: string;
}
