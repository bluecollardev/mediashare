import { ApiHideProperty, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

import { ApiEmail, ApiName, ApiObjectId, ApiPastDate, ApiString, ObjectIdArray } from '@mediashare/shared';
import { BC_ROLES, BcRolesType } from '@core-lib';
import { ObjectId } from 'mongodb';
import { LoginDto } from './login.dto';
import { User } from '../entities/user.entity';

const uuidExample = '1731ee8a-8f27-53af-805d-2ee2e705f0e2';
export class CreateUserDto extends LoginDto {
  @ApiName({ required: true })
  firstName: string;

  @ApiName({ required: true })
  lastName: string;
}

export class UserDto implements User {
  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
  @ApiString()
  phoneNumber: string;
  @ApiString()
  email: string;

  @ApiString()
  sub: string;

  @ApiString()
  createdBy?: Readonly<ObjectId>;

  @ApiString()
  userId?: ObjectId;

  @ApiString()
  username: string;
  @ApiString()
  firstName: string;
  @ApiString()
  lastName: string;

  @ApiProperty()
  sharedPlaylists?: ObjectId[];
  @ApiProperty()
  sharedMediaItems?: ObjectId[];

  @ApiObjectId()
  _id: ObjectId;

  @ApiPastDate()
  createdAt?: Date;

  @ApiPastDate()
  updatedDate?: Date;
}
