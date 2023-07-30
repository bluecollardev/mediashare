import { AutoMap } from '@automapper/classes';
import { ApiDecoratorOptions, ApiEmail, ApiName, ApiString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsEmail, IsString, Length, IsPhoneNumber } from 'class-validator';
import { BC_ROLES, BcRolesType } from '../../../core/models';

export class CreateUserDto {
  @IsString()
  @AutoMap()
  @ApiString()
  sub: string;

  @Length(3, 50)
  @IsString()
  @AutoMap()
  @ApiName(<ApiDecoratorOptions>{ required: true })
  username: string;

  // Min is technically 3 but with real domain it's x@y.zz = 6
  // https://www.rfc-editor.org/rfc/rfc2822
  @Length(6, 254)
  @IsEmail()
  @AutoMap()
  @ApiEmail(<ApiDecoratorOptions>{ required: true })
  email: string;

  @Length(2, 50)
  @IsString()
  @AutoMap()
  @ApiName(<ApiDecoratorOptions>{ required: true })
  firstName: string;

  @Length(2, 50)
  @IsDefined()
  @IsString()
  @AutoMap()
  @ApiName(<ApiDecoratorOptions>{ required: true })
  lastName: string;

  @IsOptional()
  @IsPhoneNumber()
  @AutoMap()
  @ApiString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiString()
  imageSrc?: string;

  @IsOptional()
  @AutoMap()
  @ApiProperty({ enum: BC_ROLES, name: 'role', enumName: 'BcRolesType' })
  role?: BcRolesType;

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  isDisabled?: boolean;
}
