import { ApiPastDate } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserConnectionDto {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  connectionId: string;

  @ApiPastDate({ required: false })
  createdAt?: Date;

  @ApiPastDate({ required: false })
  updatedDate?: Date;
}
