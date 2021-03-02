import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMediaShareItemDto {
  @ApiProperty({ required: true })
  @IsString()
  userId: string;

  @ApiProperty({ required: false })
  @IsString()
  mediaId: string;

  @ApiProperty({ required: true })
  @IsString()
  createdBy: string;
  title: string;
}

export class CreatePlaylistShareItemDto {
  @ApiProperty({ required: true })
  @IsString()
  userId: string;

  @ApiProperty({ required: false })
  @IsString()
  playlistId: string;

  @ApiProperty({ required: true })
  @IsString()
  createdBy: string;

  title: string;
}
