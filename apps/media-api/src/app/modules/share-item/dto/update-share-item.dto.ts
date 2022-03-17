import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMediaShareItemDto, CreatePlaylistShareItemDto } from './create-share-item.dto';

export class UpdateMediaShareItemDto extends PartialType(CreateMediaShareItemDto) {
  @ApiProperty({ required: true })
  read: boolean;
}

export class UpdatePlaylistShareItemDto extends PartialType(CreatePlaylistShareItemDto) {
  @ApiProperty({ required: true })
  read: boolean;
}
