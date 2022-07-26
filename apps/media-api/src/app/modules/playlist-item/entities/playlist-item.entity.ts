import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';
import { ApiLongString, ApiObjectId, ApiString, ApiTextString, ApiUriString } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import { MediaItem } from '@api-modules/media-item/entities/media-item.entity';
import { TagKeyValue } from '@api-modules/tag/dto/tag-key-value.dto';
import { MEDIA_CATEGORY, MediaCategoryType } from '@core-lib';

@Entity('playlist_item')
export class PlaylistItem extends MediaItem {
  constructor(props: Partial<PlaylistItem> = {}) {
    super();
    Object.assign(this as any, props);
  }

  @ApiObjectId()
  // @Transform((string) => new ObjectIdPipe())
  @Column()
  @Index('playlistId', { unique: false })
  playlistId: ObjectId;

  // TODO: Ask Sean what this transform is for, or investigate
  @ApiObjectId()
  // @Transform((string) => new ObjectIdPipe())
  @Column()
  @Index('mediaId')
  mediaId: ObjectId;

  @ApiObjectId()
  // @Transform((string) => new ObjectIdPipe())
  @Column({ nullable: false, unique: false })
  @Index('userId', { unique: false })
  userId: ObjectId;

  @ApiProperty({ type: Number })
  @Column()
  sortIndex: number;

  @Column({ nullable: true, type: 'text' })
  @ApiString()
  title: string;

  @Column({ nullable: true, type: 'text' })
  @ApiTextString()
  summary: string;

  @Column({ nullable: true, type: 'text' })
  @ApiTextString()
  description: string;

  @Column()
  @ApiUriString()
  uri: string;

  @Column({ nullable: true })
  @ApiString()
  thumbnail?: string;

  @Column({ nullable: true })
  @IsBoolean()
  @ApiProperty({ required: false })
  isPlayable: boolean;

  // TODO: Get these working again
  /* @Column({ nullable: true })
  @ApiProperty({ enum: MEDIA_CATEGORY, name: 'category', enumName: 'MediaCategoryType', required: false })
  category: MediaCategoryType;

  @ApiProperty({ type: () => TagKeyValue, isArray: true, nullable: true })
  @Column({ name: 'tags', array: true, nullable: true })
  tags: TagKeyValue[]; */
}
