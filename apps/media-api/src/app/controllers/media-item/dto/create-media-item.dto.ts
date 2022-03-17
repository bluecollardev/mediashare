import { MediaItem } from '../entities/media-item.entity';
import { IsIn } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { MediaCategoryType, MEDIA_CATEGORY, Stats } from '@core-lib';
import { ApiString, ApiLongString, ApiTextString, ApiUriString, ApiDecoratorOptions } from '@mediashare/shared';

const OPTIONAL_MEDIA_DTO_KEYS = ['_id', 'createdAt', 'updatedDate', 'userId', 'createdBy'] as const;
export class CreateMediaItemDto extends OmitType(MediaItem, [...OPTIONAL_MEDIA_DTO_KEYS]) {
  @ApiProperty({ required: true })
  @ApiString()
  title: string;

  @ApiProperty({ required: true })
  @ApiLongString()
  summary: string;

  @ApiProperty({ required: true })
  @ApiTextString()
  description: string;

  @ApiProperty({ required: true, enum: MEDIA_CATEGORY })
  @IsIn(MEDIA_CATEGORY)
  category: MediaCategoryType;

  @ApiString(<ApiDecoratorOptions>{ required: true })
  key: string;

  @ApiLongString(<ApiDecoratorOptions>{ required: true })
  thumbnail?: string;

  @ApiString()
  eTag?: string;
}

export class AdditionalMediaItemDto extends CreateMediaItemDto {
  @ApiString()
  displayFileName: string;

  @ApiUriString()
  thumbnail?: string;

  @ApiUriString()
  uri: string;
}
