import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';
import { Playlist } from '../entities/playlist.entity';

export class UpdatePlaylistDto extends PickType(Playlist, ['title', 'category', 'description', '_id']) {
  @ApiProperty({ required: false })
  @IsArray()
  mediaIds?: string[];
}
