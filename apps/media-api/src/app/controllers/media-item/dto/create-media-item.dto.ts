import { Tag } from 'apps/media-api/src/core/entities/tag.entity';
import { ObjectId } from 'mongodb';
import { MediaItem } from '../entities/media-item.entity';

export class CreateMediaItemDto
  implements
    Pick<
      MediaItem,
      'summary' | 'tags' | 'isPlayable' | 'description' | 'userId'
    > {
  isPlayable: boolean;
  summary: string;
  description: string;
  tags: Tag[];
  userId: ObjectId;
}
