import { PartialType } from '@nestjs/swagger';
import { User } from '../../../modules/user/entities/user.entity';

export class UpdateUserDto extends PartialType(User) {}
