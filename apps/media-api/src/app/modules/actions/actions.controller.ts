import { Controller, Get, Res, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
// import { GetUserId } from '@api-core/decorators/user.decorator';
import { writeFileSync } from 'fs';

@ApiTags('actions')
@Controller({ path: ['actions'] })
  export class ActionsController {
  @HttpCode(HttpStatus.OK)
  @Get('open-invitation/:userId')
  @ApiParam({ name: 'userId', type: String, required: true })
  async openInApp(@Res() res: Response, @Param('userId') userId: string) {
    const url = process.env['ACCEPT_INVITATION_DEEPLINK'].replace('{{userId}}', userId);
    // Compose your HTML template here. Ensure that <script>  </script> is embedded inside HTML with var redirectToApp = function(){window.location.replace=url} and window.location = redirectToApp()
    const html = `
      <html>
        <head>
          <title>Accept invitation in Mediashare</title>
          <script type="application/javascript">
            var redirectToApp = function() {
              window.location.replace(('${url}' || window.location.href));
            };
            redirectToApp();
          </script>
        </head>
        <body style="background-color: rgba(30,30,30,1)"></body>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(html);
  }
}
