import { ApiPastDate } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserConnectionDto {
  @ApiProperty({ required: true })
  @IsString()
  userId: string;

  @ApiProperty({ required: true })
  connectionId: string;

  @ApiPastDate()
  createdAt?: Date;

  @ApiPastDate()
  updatedDate?: Date;
}


