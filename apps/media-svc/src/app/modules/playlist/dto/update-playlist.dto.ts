import { ApiProperty } from '@nestjs/swagger';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';
import { IsArray } from 'class-validator';
// import { TagKeyValue } from '../tag/dto/tag-key-value.dto';
import { PlaylistVisibilityType, PLAYLIST_VISIBILITY } from '../../../core/models';

export class UpdatePlaylistDto extends ApiBaseDto {
  @ApiProperty({ required: false })
  @IsArray()
  mediaIds?: string[];

  @ApiProperty({ enum: PLAYLIST_VISIBILITY, name: 'visibility', enumName: 'PlaylistVisibilityType' })
  visibility: PlaylistVisibilityType;

  // @ApiProperty({ type: () => TagKeyValue, name: 'tags', isArray: true, nullable: true })
  tags: any[]; // TagKeyValue[];
}
