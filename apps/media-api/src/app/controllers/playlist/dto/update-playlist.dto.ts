import { PLAYLIST_CATEGORY, PlaylistCategoryType } from '@core-lib';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';
import { CreatePlaylistDto } from './create-playlist.dto';

export class UpdatePlaylistDto extends PartialType(OmitType(CreatePlaylistDto, ['items'])) {
  @ApiProperty({ required: false })
  @IsArray()
  items?: PlaylistItem[];

  @ApiProperty({ required: false })
  @IsString()
  userId?: string;

  @ApiProperty({ required: false })
  @IsString()
  title?: string;

  @ApiProperty({ required: false, enum: PLAYLIST_CATEGORY })
  category: PlaylistCategoryType;
}
