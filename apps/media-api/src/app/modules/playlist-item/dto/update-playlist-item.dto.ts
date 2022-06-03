import { PartialType } from '@nestjs/swagger';
import { PlaylistItem } from '../entities/playlist-item.entity';

export class UpdatePlaylistItemDto extends PartialType(PlaylistItem) {}
