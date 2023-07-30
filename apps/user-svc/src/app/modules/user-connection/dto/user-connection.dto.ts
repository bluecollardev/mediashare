import { AutoMap } from '@automapper/classes';
import { ApiDecoratorOptions, ApiObjectId, ApiPastDate } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UserConnectionDto {
  @IsOptional()
  @AutoMap()
  @ApiObjectId()
  @ApiProperty({ required: false })
  _id?: ObjectId;

  @IsDefined()
  @AutoMap()
  @ApiObjectId()
  @ApiProperty({ required: true })
  userId: ObjectId;

  @IsDefined()
  @AutoMap()
  @ApiObjectId()
  @ApiProperty({ required: true })
  connectionId: ObjectId;

  @IsOptional()
  @AutoMap()
  @ApiPastDate({ required: false } as ApiDecoratorOptions)
  createdAt?: Date;

  @IsOptional()
  @ApiPastDate({ required: false } as ApiDecoratorOptions)
  updatedDate?: Date;
}
