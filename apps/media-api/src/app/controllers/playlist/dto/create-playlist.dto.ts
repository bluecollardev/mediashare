import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({ required: true })
  @IsArray()
  items: string[];

  @ApiProperty({ required: true })
  @IsString()
  userId: string;

  @ApiProperty({ required: true })
  @IsString()
  title: string;
}
