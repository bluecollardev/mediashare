import { ApiString } from '@mediashare/shared';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { MediaItem } from '../entities/media-item.entity';
import { AdditionalMediaItemDto, CreateMediaItemDto } from './create-media-item.dto';

export class MediaItemDto extends MediaItem {
  @ApiProperty({ type: String, name: 'author' })
  @IsString()
  author: string;
}
