import { BcEntity } from '@api';
import { PlaylistCategoryType, PlaylistInterface, PLAYLIST_CATEGORY, PLAYLIST_ENTITY } from '@core-lib';
import { ApiObjectId, ApiString } from '@mediashare/shared';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';

export const PLAYLIST_TOKEN = PLAYLIST_ENTITY;
@Entity(PLAYLIST_TOKEN)
export class Playlist extends BcEntity implements PlaylistInterface {
  @Column()
  @ApiString()
  title: string;

  @ApiObjectId()
  @ObjectIdColumn()
  userId: ObjectId;

  @Column({ type: 'enum', enum: PLAYLIST_CATEGORY })
  @ApiProperty({ required: true, enum: PLAYLIST_CATEGORY })
  @IsIn(PLAYLIST_CATEGORY)
  category: PlaylistCategoryType;
}

class PlaylistResponseFields {
  @ApiProperty({ type: PlaylistItem, isArray: true })
  playlistItems: Readonly<PlaylistItem[]>;
}

export class PlaylistByUserResponseDto extends IntersectionType(PlaylistResponseFields, Playlist) {}
