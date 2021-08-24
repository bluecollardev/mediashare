import { ObjectId } from 'mongodb';
import { MediaItem } from '../entities/media-item.entity';
import { IsBoolean, IsIn, IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { ApiDefaults, MediaCategoryType, MEDIA_CATEGORY, Stats } from '@core-lib';
import { Tag } from '../../../core/entities/tag.entity';
import { ApiObjectId, ApiString, ApiUriString } from '@mediashare/shared';

// const CreateKeys:  Readonly<keyof MediaItem[]> = [ 'summary', 'isPlayable', 'description', 'title', 'category', 'userId' ] as const;
const OPTIONAL_MEDIA_DTO_KEYS = ['_id', 'createdAt', 'updatedDate', 'userId', 'createdBy'] as const;
export class CreateMediaItemDto extends OmitType(MediaItem, [...OPTIONAL_MEDIA_DTO_KEYS]) {
  @IsString()
  @ApiProperty({ required: true })
  summary: string;

  @IsString()
  @MinLength(ApiDefaults.longString.min)
  @MaxLength(ApiDefaults.longString.max)
  @ApiProperty({ required: true })
  description: string;

  @IsString()
  @MinLength(ApiDefaults.longString.min)
  @MaxLength(ApiDefaults.longString.max)
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true, enum: MEDIA_CATEGORY })
  @IsIn(MEDIA_CATEGORY)
  category: MediaCategoryType;

  @IsString()
  @ApiString({ required: true })
  key: string;
}

export class AdditionalMediaItemDto extends CreateMediaItemDto {
  @ApiString()
  displayFileName: string;

  @ApiUriString()
  thumbnail?: string;

  @ApiUriString()
  uri: string;
}
