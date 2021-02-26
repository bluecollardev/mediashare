import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreatePlaylistDto } from './create-playlist.dto';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @ApiProperty({ required: false })
  @IsArray()
  items?: string[];

  @ApiProperty({ required: false })
  @IsString()
  userId?: string;

  @ApiProperty({ required: false })
  @IsString()
  title?: string;
}
