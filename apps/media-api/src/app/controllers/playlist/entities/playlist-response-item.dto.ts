import { IntersectionType, PickType } from '@nestjs/swagger';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { Playlist } from './playlist.entity';

export class PlaylistResponseDto extends IntersectionType(PlaylistItem, MediaItem) {}
