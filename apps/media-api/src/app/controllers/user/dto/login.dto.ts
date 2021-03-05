import { ApiEmail } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsJWT } from 'class-validator';
const exampleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.yJ1c2VyIjp7ImF1dGhJZCI6ImEwMWM4ZDhjLWExYTMtNDdjMS05MGVjLTY0ZmRkOTFiYjYxMSIsInVzZXJuYW1lIjoiTmFkaWExMkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRRQy9KYXlWeDhYOHZYVUhjUmpSSWZPLmdXaGQ1U0FEYmFNbC9CeXgvUjdvVGJYSzRnQ1IyLiIsImVtYWlsIjoiTmFkaWExMkBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTA1VDEyOjA2OjMzLjgzMVoiLCJfaWQiOiI2MDQyMWVjOTdiYmVlYTA2ZGZiZjI2ZGEiLCJyb2xlcyI6WyJndWVzdCJdfSwic3ViIjoiYTAxYzhkOGMtYTFhMy00N2MxLTkwZWMtNjRmZGQ5MWJiNjExIiwiaWF0IjoxNjE0OTQ2MDI4LCJleHAiOjE2MTQ5ODIwMjh9.ZK5s6OFB8zQ0yL3SgzYZXpjTMJyptXv5FouDyqQVlg';

export class LoginDto {
  @ApiEmail({ required: true })
  username: string;

  @ApiProperty({ required: true, writeOnly: true, minLength: 8, maxLength: 20 })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class TokenDto {
  @ApiProperty({
    type: String,
    example: exampleToken,
    pattern: '^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$',
  })
  @IsJWT()
  token: string;
}
