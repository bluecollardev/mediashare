import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { CreateMediashareItemDto } from './create-share-item.dto';

export class UpdateShareItemDto extends PartialType(CreateMediashareItemDto) {
  @ApiProperty({ required: true })
  read: boolean;
}
