import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn } from 'class-validator';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';
// import { TagKeyValue } from '../tag/dto/tag-key-value.dto';
import { PlaylistVisibilityType, PLAYLIST_VISIBILITY } from '../../../core/models';

export class UpdatePlaylistDto extends ApiBaseDto {
  @ApiProperty({ required: false })
  @IsArray()
  mediaIds?: string[];

  @IsIn(PLAYLIST_VISIBILITY)
  @AutoMap()
  @ApiProperty({ enum: PLAYLIST_VISIBILITY, name: 'visibility', enumName: 'PlaylistVisibilityType', required: true })
  visibility: PlaylistVisibilityType;

  // @ApiProperty({ type: () => TagKeyValue, required: false, isArray: true, nullable: true })
  tags?: any[]; // TagKeyValue[];
}
