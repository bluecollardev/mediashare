import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserGuard } from './guards/user.guard';

const UseJwtGuard = function () {
  return applyDecorators(UseGuards(UserGuard), ApiBearerAuth());
};

export { UseJwtGuard };
