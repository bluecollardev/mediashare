import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

import { ApiDefaults } from '@core-lib';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(ApiDefaults.nameString.min)
  @MaxLength(ApiDefaults.nameString.max)
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(ApiDefaults.nameString.min)
  @MaxLength(ApiDefaults.nameString.max)
  lastName: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
