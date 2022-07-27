import { PartialType } from '@nestjs/mapped-types';
import { CreateUserConnectionDto } from './create-user-connection.dto';

export class UpdateUserConnectionDto extends PartialType(CreateUserConnectionDto) {}
