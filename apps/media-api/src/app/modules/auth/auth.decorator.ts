import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const UseJwtGuard = function () {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth());
};

export { UseJwtGuard };
