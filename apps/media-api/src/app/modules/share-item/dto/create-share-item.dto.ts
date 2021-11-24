import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateMediashareItemDto {
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

export class CreateMediashareItemInput {
  userId: ObjectId;
  mediaId?: ObjectId;
  playlistId?: ObjectId;
  createdBy: ObjectId;
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
}
