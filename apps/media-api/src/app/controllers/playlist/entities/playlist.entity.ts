import { BcEntity } from '@api';
import { PlaylistCategoryType, PlaylistInterface, PLAYLIST_CATEGORY } from '@core-lib';
import { ApiArray, ApiObjectId, ApiString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';

export const PLAYLIST_TOKEN = 'playlist';
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
