import { PartialType } from '@nestjs/mapped-types';
import { UserConnectionDto } from './user-connection.dto';

export class UpdateUserConnectionDto extends PartialType(UserConnectionDto) {}
