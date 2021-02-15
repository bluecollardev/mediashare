import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail() username: string;
  firstName: string;
  lastName: string;
}
