import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TagKeyValue {
  @ApiProperty({ required: true })
  @IsString()
  key: string;

  @ApiProperty({ required: true })
  @IsString()
  value: string;
}
