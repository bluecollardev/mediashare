import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateTagDto {
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

export class CreateTagInput {
  userId: ObjectId;
  mediaId?: ObjectId;
  playlistId?: ObjectId;
  createdBy: ObjectId;
  title: string;
}
