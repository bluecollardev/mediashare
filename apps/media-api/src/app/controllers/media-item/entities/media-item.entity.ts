import { BcBaseEntity, BcEntity } from '@api';
import { Media, MediaCategoryType, MEDIA_CATEGORY, PlaylistCategoryType, Stats } from '@core-lib';
import { ApiLongString, ApiObjectId, ApiString, ApiUriString } from '@mediashare/shared';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsIn } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index } from 'typeorm';
export const MEDIA_TOKEN = 'media_item' as const;

@Entity(MEDIA_TOKEN)
export class MediaItem extends BcEntity {
  constructor(props: Partial<MediaItem> = {}) {
    super();
    Object.assign(this, props);
  }
  @Column()
  @IsBoolean()
  @ApiProperty({ required: true })
  isPlayable: boolean;

  @Column()
  @ApiLongString()
  summary: string;
  @ApiString({ required: true })
  description: string;

  @ApiObjectId()
  @Index()
  @Column({ nullable: false })
  userId: ObjectId;

  @ApiString()
  @Column({ nullable: true, type: 'text' })
  title: string;

  @ApiString()
  @Column()
  displayFileName: string;

  @Column()
  @ApiUriString({ required: false })
  thumbnail?: string;
  @Column()
  @ApiUriString()
  uri: string;

  @Column()
  @ApiProperty({ enum: MEDIA_CATEGORY })
  @IsArray()
  @IsIn(MEDIA_CATEGORY)
  category: MediaCategoryType;
}
