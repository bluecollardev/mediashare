import { ApiControllerDecoratorParams } from '@mediashare/shared';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UseJwtGuard } from '../../../modules/auth/auth.decorator';
import { UserDto } from '../dto/create-user.dto';

function UserPostResponse({ isArray = false, type = UserDto, description }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(
    ApiResponse({ description, type, status: 201, isArray }),
    // UseJwtGuard()
  );
}

const UserGetResponse = function ({ isArray = false, type = UserDto }: ApiControllerDecoratorParams = {}) {
  return applyDecorators(
    ApiResponse({ type, isArray, status: 200 }),
    // UseJwtGuard()
  );
};

export { UserPostResponse, UserGetResponse };
