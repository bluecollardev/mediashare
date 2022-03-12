import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserGuard } from './guards/user.guard';

const UseJwtGuard = function () {
  return applyDecorators(UseGuards(UserGuard), ApiBearerAuth());
};

export { UseJwtGuard };
