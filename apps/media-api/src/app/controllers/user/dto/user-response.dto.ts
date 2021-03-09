import { ApiObjectId } from '@mediashare/shared';
import { OmitType } from '@nestjs/swagger';
import { UserDto } from './create-user.dto';

export class UserResponseDto extends OmitType(UserDto, ['_id']) {
  @ApiObjectId()
  _id: string;
}
