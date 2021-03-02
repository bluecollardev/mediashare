import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { CreateMediaShareItemDto } from './create-share-item.dto';

export class UpdateShareItemDto extends PartialType(CreateMediaShareItemDto) {
  @ApiProperty({ required: true })
  read: boolean;
}
