import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

ApiTags('Main');
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('online-status')
  @ApiResponse({ description: 'Used to validate that the app is online and connectivity is enabled', type: 'boolean' })
  isOnline() {
    return true;
  }
}
