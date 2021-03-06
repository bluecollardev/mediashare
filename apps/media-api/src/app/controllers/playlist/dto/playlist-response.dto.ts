import { ApiArray } from '@mediashare/shared';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { BcEntity } from '../../../core';
import { Playlist } from '../entities/playlist.entity';
import { PlaylistItemResponseDto } from './playlist-response-item.dto';

export class PlaylistResponseDto extends PickType(Playlist, ['_id', 'title']) {
  @ApiProperty({ name: 'Media Items', type: () => PlaylistItemResponseDto, description: 'Playlist response DTO' })
  mediaItems: PlaylistItemResponseDto[];
}

export { PlaylistItemResponseDto };
