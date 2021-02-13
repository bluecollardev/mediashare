import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to media-api!' };
  }
}
