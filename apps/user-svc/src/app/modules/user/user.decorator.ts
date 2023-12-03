import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
// import { UseJwtGuard } from '@api-modules/auth/auth.decorator';
import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { UserDto } from './dto/user.dto';

export function UserGetResponse({
  type = UserDto,
  isArray = false,
  description,
}: ApiControllerDecoratorParams = {}) {
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 200 }), UseJwtGuard());
  return applyDecorators(
    ApiResponse({ type, isArray, description, status: 200 })
  );
}

export function UserPostResponse({
  type = UserDto,
  isArray = false,
  description,
}: ApiControllerDecoratorParams = {}) {
  return applyDecorators(
    ApiResponse({ type, isArray, description, status: 201 })
  );
  // return applyDecorators(ApiResponse({ type, isArray, description, status: 201 }), UseJwtGuard());
}
