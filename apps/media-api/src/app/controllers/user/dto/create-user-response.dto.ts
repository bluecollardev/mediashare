import { AuthUserInterface, AuthUserResponseType, bcRoles, BcRolesType, BC_ROLES } from '@core-lib';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsEmail, IsMongoId, IsString, IsUUID } from 'class-validator';
import { ObjectId } from 'mongodb';
import { User } from '../entities/user.entity';

import * as R from 'remeda';

export interface CreateUserResponseDtoInterface extends AuthUserResponseType, User {}

export class CreateUserResponseDto implements CreateUserResponseDtoInterface {
  static create(profile: User, user: Omit<AuthUserInterface, 'password'>): CreateUserResponseDto {
    const pickFields: Array<keyof AuthUserResponseType | keyof User> = [
      'authId',
      'username',
      'email',
      'createdAt',
      '_id',
      'firstName',
      'lastName',
    ];

    const merged = R.merge(profile, user);

    const pickedFields = R.pick(merged, pickFields);
    return new CreateUserResponseDto(pickedFields);
  }

  constructor(values: CreateUserResponseDto) {
    Object.assign(this, values);
  }

  @ApiProperty()
  @IsUUID()
  authId: string;

  @ApiProperty()
  @IsEmail()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsMongoId()
  _id: ObjectId;

  @ApiProperty({ enum: BC_ROLES, isArray: true })
  @IsArray()
  roles: BcRolesType[];

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  sharedPlaylists?: ObjectId[];

  @ApiProperty()
  @IsString()
  sharedMediaItems?: ObjectId[];
}
