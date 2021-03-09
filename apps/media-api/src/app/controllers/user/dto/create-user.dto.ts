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

export class UserAuthFieldsDto {
  @ApiObjectId({ required: true })
  _id: Readonly<ObjectId>;

  @ApiProperty({
    type: String,
    readOnly: true,
    example: uuidExample,
    maxLength: uuidExample.length,
    minLength: uuidExample.length,
  })
  @IsUUID()
  authId: Readonly<string>;

  @ApiEmail()
  email: Readonly<string>;

  @ApiPastDate({ readOnly: false })
  createdAt: Readonly<Date>;

  @ApiProperty({ enum: BC_ROLES })
  @IsArray()
  roles: BcRolesType[];
}

export class UserDto extends IntersectionType(OmitType(User, ['_id', 'userId']), OmitType(UserAuthFieldsDto, ['_id'])) {
  @ApiHideProperty()
  password: string;
}
