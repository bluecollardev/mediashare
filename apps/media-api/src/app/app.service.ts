import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to media-api!' };
  }

  constructor() {}
}
