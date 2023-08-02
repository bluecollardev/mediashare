import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateMediaShareItemDto {
  @IsString()
  @ApiProperty({ required: true })
  userId: string;

  @IsString()
  @ApiProperty({ required: false })
  mediaId?: string;

  @IsString()
  @ApiProperty({ required: false })
  playlistId?: string;

  @IsString()
  @ApiProperty({ required: true })
  createdBy: string;
}

export class CreatePlaylistShareItemDto {
  @IsString()
  @ApiProperty({ required: true })
  userId: string;

  @IsString()
  @ApiProperty({ required: false })
  mediaId?: string;

  @IsString()
  @ApiProperty({ required: false })
  playlistId?: string;

  @IsString()
  @ApiProperty({ required: true })
  createdBy: string;
}
