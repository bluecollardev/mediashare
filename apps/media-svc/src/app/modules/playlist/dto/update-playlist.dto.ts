import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Playlist } from '../entities/playlist.entity';
import { TagKeyValue } from '../tag/dto/tag-key-value.dto';
import { PlaylistVisibilityType, PLAYLIST_VISIBILITY } from '../../../core/models';

export class UpdatePlaylistDto extends PickType(Playlist, ['title', 'visibility', 'description', '_id', 'imageSrc']) {
  @ApiProperty({ required: false })
  @IsArray()
  mediaIds?: string[];

  @ApiProperty({ enum: PLAYLIST_VISIBILITY, name: 'visibility', enumName: 'PlaylistVisibilityType' })
  visibility: PlaylistVisibilityType;

  @ApiProperty({ type: () => TagKeyValue, name: 'tags', isArray: true, nullable: true })
  tags: TagKeyValue[];
}
