import { ObjectId } from 'mongodb';
import { Tag } from '../../../core/entities/tag.entity';
import { MediaItem } from '../entities/media-item.entity';
import { IsBoolean, IsString, Max, Min } from 'class-validator';

export class CreateMediaItemDto
  implements
    Pick<MediaItem, 'summary' | 'isPlayable' | 'description' | 'userId'> {
  @IsBoolean()
  isPlayable: boolean;

  @IsString()
  summary: string;

  @IsString()
  @Min(50)
  @Max(255)
  description: string;

  userId: ObjectId;

  @IsString()
  @Min(10)
  @Max(50)
  title: string;
}
