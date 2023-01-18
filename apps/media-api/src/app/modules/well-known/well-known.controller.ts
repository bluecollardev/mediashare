import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('.well-known')
@Controller('.well-known')
export class WellKnownController {
  constructor() {}

  @Get(`apple-app-site-association`)
  @ApiResponse({ status: 200, isArray: false })
  async aasa() {
    return {
      applinks: {
        apps: [], // This is usually left empty, but still must be included,
        details: [
          // iOS 13+
          /* {
            // App ID Prefix + Bundle Identifier
            "appIDs": ["F7S7UFS5M3.oi.afehrpt.pocketpt"],
            "components": [
              {
                "/": "/accept-invitation/*",
              }
            ]
          }, */
          // iOS < 13
          {
            appID: ['F7S7UFS5M3.oi.afehrpt.pocketpt'],
            paths: ['/*'],
          },
        ],
      },
    };
  }
}
