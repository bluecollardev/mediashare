import { ApiProperty } from '@nestjs/swagger';

export class AuthorizeDto {
  @ApiProperty({
    type: String,
    pattern: '^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    pattern: '^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$',
  })
  idToken: string;
}

export class InviteDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;
}
