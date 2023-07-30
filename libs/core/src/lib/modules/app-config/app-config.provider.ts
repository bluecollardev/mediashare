import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get(key: keyof AppConfigService);
  get(prefix = 'app', key: keyof AppConfigService) {
    if (prefix) {
      return this.configService.get(`${prefix}.${key}`);
    }
    return this.configService.get(`${key}`);
  }
}
