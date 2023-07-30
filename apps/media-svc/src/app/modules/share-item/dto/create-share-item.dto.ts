import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateMediaShareItemDto {
  @ApiProperty({ required: true })
  @IsString()
  userId: ObjectId;

  @ApiProperty({ required: false })
  @IsString()
  mediaId?: ObjectId;

  @ApiProperty({ required: false })
  @IsString()
  playlistId?: ObjectId;

  @ApiProperty({ required: true })
  @IsString()
  createdBy: ObjectId;

  @ApiProperty({ required: false })
  @IsString()
  title: string;
}

export class CreatePlaylistShareItemDto {
  @ApiProperty({ required: true })
  @IsString()
  userId: ObjectId;

  @ApiProperty({ required: false })
  @IsString()
  playlistId: ObjectId;

  @ApiProperty({ required: true })
  @IsString()
  createdBy: ObjectId;

  @ApiProperty({ required: false })
  @IsString()
  title: string;
}
