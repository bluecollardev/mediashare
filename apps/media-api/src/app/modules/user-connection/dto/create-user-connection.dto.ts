import { ApiPastDate } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateUserConnectionDto {

  @ApiProperty({ required: true })
  @IsString()
  userId: ObjectId;

  @ApiProperty({ required: true })
  @IsString()
  connectionId: ObjectId;

  @ApiPastDate()
  createdAt?: Date;

  @ApiPastDate()
  updatedDate?: Date;

}

