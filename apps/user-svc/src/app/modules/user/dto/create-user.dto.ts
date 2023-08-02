import { AutoMap } from '@automapper/classes';
import { ApiEmail, ApiName, ApiString, ApiUriString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, IsString, Length, IsPhoneNumber } from 'class-validator';
import { BC_ROLES, BcRolesType } from '../../../core/models';

export class CreateUserDto {
  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  sub: string;

  @Length(2, 50)
  @IsString()
  @AutoMap()
  @ApiName({ required: true })
  username: string;

  // Min is technically 3 but with real domain it's x@y.zz = 6
  // https://www.rfc-editor.org/rfc/rfc2822
  @Length(6, 255)
  @IsEmail()
  @AutoMap()
  @ApiEmail({ required: true })
  email: string;

  @Length(2, 50)
  @IsString()
  @AutoMap()
  @ApiName({ required: true })
  firstName: string;

  @Length(2, 50)
  @IsString()
  @AutoMap()
  @ApiName({ required: true })
  lastName: string;

  @IsOptional()
  @IsPhoneNumber()
  @AutoMap()
  @ApiString({ required: false })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiUriString({ required: false })
  imageSrc?: string;

  @IsOptional()
  @AutoMap()
  @ApiProperty({ enum: BC_ROLES, name: 'role', enumName: 'BcRolesType' })
  role?: BcRolesType;

  @IsOptional()
  @AutoMap()
  @ApiProperty({ required: false })
  isDisabled?: boolean;
}
