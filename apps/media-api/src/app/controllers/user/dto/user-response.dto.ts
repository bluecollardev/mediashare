import { ApiObjectId } from '@mediashare/shared';
import { UserDto } from './create-user.dto';

export class UserResponseDto extends UserDto {
  @ApiObjectId()
  _id: any;
}
