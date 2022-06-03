import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Playlist } from '../entities/playlist.entity';
import { TagKeyValue } from '@api-modules/tag/dto/tag-key-value.dto';
import { PlaylistCategoryType, PLAYLIST_CATEGORY } from '@core-lib';

export class UpdatePlaylistDto extends PickType(Playlist, ['title', 'category', 'description', '_id', 'imageSrc']) {
  @ApiProperty({ required: false })
  @IsArray()
  mediaIds?: string[];

  @ApiProperty({ enum: PLAYLIST_CATEGORY, name: 'category', enumName: 'PlaylistCategoryType' })
  category: PlaylistCategoryType;

  @ApiProperty({ type: () => TagKeyValue, name: 'tags', isArray: true, nullable: true })
  tags: TagKeyValue[];
}
