import { TagKeyValue } from '@api-modules/tag/dto/tag-key-value.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Playlist } from '../entities/playlist.entity';

export class CreatePlaylistDto extends PickType(Playlist, ['category', 'title', 'description', 'imageSrc']) {
  @ApiProperty({ isArray: true, type: 'string', writeOnly: true, required: true })
  @IsArray()
  mediaIds: string[];

  @ApiProperty({ type: TagKeyValue, isArray: true, nullable: true })
  tags: TagKeyValue[];
}
