import { BcEntity } from '@api';
import { PlaylistCategoryType, PlaylistInterface, PLAYLIST_CATEGORY, PLAYLIST_ENTITY } from '@core-lib';
import { ApiObjectId, ApiString } from '@mediashare/shared';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn, Index } from 'typeorm';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';

@Entity('playlist')
export class Playlist extends BcEntity implements PlaylistInterface {
  @Column('title')
  @ApiString()
  title: string;

  @Column('description')
  @ApiString()
  description: string;

  @Column('imageSrc')
  @ApiString()
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
