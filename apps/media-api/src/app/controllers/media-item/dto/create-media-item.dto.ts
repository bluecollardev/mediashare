import { ObjectId } from 'mongodb';
import { MediaItem } from '../entities/media-item.entity';
import { IsBoolean, IsIn, IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiDefaults, MediaCategoryType, MEDIA_CATEGORY, Stats } from '@core-lib';
import { Tag } from '../../../core/entities/tag.entity';
import { ApiObjectId, ApiString, ApiUriString } from '@mediashare/shared';

type CreateKeys = 'summary' | 'isPlayable' | 'description' | 'title' | 'category' | 'userId';
export class CreateMediaItemDto implements Pick<MediaItem, CreateKeys> {
  @IsBoolean()
  @ApiProperty({ required: true })
  isPlayable: boolean;

  @IsString()
  @ApiProperty({ required: true })
  summary: string;

  @IsString()
  @MinLength(ApiDefaults.longString.min)
  @MaxLength(ApiDefaults.longString.max)
  @ApiProperty({ required: true })
  description: string;

  @ApiObjectId({ required: true })
  userId: NonNullable<ObjectId>;

  @IsString()
  @MinLength(ApiDefaults.longString.min)
  @MaxLength(ApiDefaults.longString.max)
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true, enum: MEDIA_CATEGORY })
  @IsIn(MEDIA_CATEGORY)
  category: MediaCategoryType;
}

export class AdditionalMediaItemDto implements Omit<MediaItem, CreateKeys> {
  @ApiString()
  displayFileName: string;

  @ApiUriString()
  thumbnail?: string;

  @ApiUriString()
  uri: string;

  @ApiObjectId({ required: true })
  _id: ObjectId;
}
