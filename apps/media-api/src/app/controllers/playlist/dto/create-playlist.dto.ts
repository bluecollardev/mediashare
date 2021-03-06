import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Playlist } from '../entities/playlist.entity';
export class CreatePlaylistDto extends PickType(Playlist, ['category', 'title']) {
  @ApiProperty({ required: true })
  @IsArray()
  items: string[];
}
