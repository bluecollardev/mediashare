import { createParamDecorator, Logger } from '@nestjs/common';

export const GetUser = createParamDecorator((data, req) => {
  // req.session.user = jwt
  Logger.warn(data);
  return req.session;
});
