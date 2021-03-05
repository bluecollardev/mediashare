import { BcBaseEntity, BcEntity } from '@api';
import { Media, MediaCategoryType, MEDIA_CATEGORY, PlaylistCategoryType, Stats } from '@core-lib';
import { ApiLongString, ApiObjectId, ApiString, ApiUriString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsIn } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity } from 'typeorm';
import { Tag } from '../../../core/entities/tag.entity';

@Entity('media-item')
export class MediaItem extends BcEntity implements Media {
  constructor(props: Partial<MediaItem> = {}) {
    super();
    Object.assign(this, props);
  }
  @Column('boolean')
  @IsBoolean()
  @ApiProperty({ required: true })
  isPlayable: boolean;

  @Column('multilinestring')
  @ApiLongString()
  summary: string;
  @ApiString({ required: true })
  description: string;

  @ApiObjectId()
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

  @Column({ enum: MEDIA_CATEGORY })
  @ApiProperty({ enum: MEDIA_CATEGORY })
  @IsArray()
  @IsIn(MEDIA_CATEGORY)
  category: MediaCategoryType;
}
