import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { MediaItem } from '../entities/media-item.entity';

export class MediaItemDto extends MediaItem {
  @ApiProperty({ type: String, name: 'author' })
  @IsString()
  author: string;
}
