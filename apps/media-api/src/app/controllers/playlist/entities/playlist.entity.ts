import { Column, Entity, Index } from 'typeorm';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { ApiObjectId, ApiString, ApiTextString } from '@mediashare/shared';
import { PlaylistCategoryType, PlaylistInterface, PLAYLIST_CATEGORY } from '@core-lib';
import { BcEntity } from '@api-core/entities/base.entity';
import { TagKeyValue } from '@api-modules/tag/dto/tag-key-value.dto';
import { PlaylistItem } from '@api-modules/playlist-item/entities/playlist-item.entity';

@Entity('playlist')
export class Playlist extends BcEntity implements PlaylistInterface {
  @Column('title')
  @ApiString()
  title: string;

  @Column('description')
  @ApiTextString()
  description: string;

  @Column('imageSrc')
  @ApiProperty({ required: false })
  imageSrc: string;

  @Column('mediaIds')
  @ApiProperty({ type: String, isArray: true, nullable: true })
  mediaIds: ObjectId[];

  @ApiObjectId()
  @Column('userId')
  @Index('userId', { unique: false })
  userId: ObjectId;

  @Column('category')
  @ApiProperty({ enum: PLAYLIST_CATEGORY, name: 'category', enumName: 'PlaylistCategoryType' })
  category: PlaylistCategoryType;

  @ApiProperty({ type: TagKeyValue, isArray: true, nullable: true })
  @Column({ name: 'tags', array: true, nullable: true })
  tags: TagKeyValue[];
}

class PlaylistResponseFields {
  @ApiProperty({ type: PlaylistItem, isArray: true })
  playlistItems: Readonly<PlaylistItem[]>;
}

export class PlaylistByUserResponseDto extends IntersectionType(PlaylistResponseFields, Playlist) {}
