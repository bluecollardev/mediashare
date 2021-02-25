import { ApiDefaults } from '@core-lib';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(ApiDefaults.nameString.min)
  @MaxLength(ApiDefaults.nameString.max)
  firstName?: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(ApiDefaults.nameString.min)
  @MaxLength(ApiDefaults.nameString.max)
  lastName?: string;
}
