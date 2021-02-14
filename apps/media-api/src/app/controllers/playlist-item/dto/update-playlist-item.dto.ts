import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistItemDto } from './create-playlist-item.dto';

export class UpdatePlaylistItemDto extends PartialType(CreatePlaylistItemDto) {}
