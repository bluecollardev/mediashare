import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class JwtDecodeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Logger.warn('Request...' + req);

    next();
  }
}
