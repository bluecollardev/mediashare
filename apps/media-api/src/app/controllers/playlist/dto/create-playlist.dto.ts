import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { PlaylistCategoryType, PLAYLIST_CATEGORY } from '@core-lib';
export class CreatePlaylistDto {
  @ApiProperty({ required: true })
  @IsArray()
  items: string[];

  @ApiProperty({ required: true })
  @IsString()
  title: string;

  @ApiProperty({ required: true, enum: PLAYLIST_CATEGORY })
  category: PlaylistCategoryType;
}
