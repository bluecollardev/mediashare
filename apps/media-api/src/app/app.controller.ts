import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

ApiTags('Main');
@Controller()
export class AppController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @ApiResponse({ description: 'Used to validate that the app is online and connectivity is enabled', status: 200 })
  @Get('online-status')
  isOnline() {
    return true;
  }
}
