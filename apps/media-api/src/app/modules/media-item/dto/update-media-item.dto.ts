import { PartialType } from '@nestjs/swagger';
import { MediaItem } from '../entities/media-item.entity';

export class UpdateMediaItemDto extends PartialType(MediaItem) {}
