import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserGuard } from '@api-modules/user/user.guard';

export function UseJwtGuard() {
  return applyDecorators(UseGuards(UserGuard), ApiBearerAuth());
}
