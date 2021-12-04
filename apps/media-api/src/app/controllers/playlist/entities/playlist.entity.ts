import { BcEntity } from '@api';
import { PlaylistCategoryType, PlaylistInterface, PLAYLIST_CATEGORY } from '@core-lib';
import { ApiObjectId, ApiString, ApiTextString } from '@mediashare/shared';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index } from 'typeorm';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';

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
}

class PlaylistResponseFields {
  @ApiProperty({ type: PlaylistItem, isArray: true })
  playlistItems: Readonly<PlaylistItem[]>;
}

export class PlaylistByUserResponseDto extends IntersectionType(PlaylistResponseFields, Playlist) {}
