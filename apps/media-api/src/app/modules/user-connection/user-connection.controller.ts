import { Controller, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { UserConnectionService } from './user-connection.service';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserConnectionDto } from './dto/create-user-connection.dto';

@ApiTags('user-connection')
@Controller('user-connection')
export class UserConnectionController {
  constructor(private readonly userConnectionService: UserConnectionService) {}

  @Post()
  @ApiBody({ type: CreateUserConnectionDto })
  async createUserConnection(@Req() req: Request, @Res() res: Response) {
    try {
      const { userId, connectionId } = req.body as any;
      const result = await this.userConnectionService.createUserConnection({ userId, connectionId });
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new error();
    }
  }

  @Post('send-email')
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'userId', required: false })
  async sendEmail(@Query('email') email, @Query('userId') userId, @Res() res: Response) {
    console.log(email, userId);
    const mail = {
      to: email,
      subject: 'Hello from mediashare',
      from: 'mimrachapol@gmail.com', // create new identity on aws SES
      html: `<h1>Hello
      <a href="http://localhost:3000/invite/id?pid=${userId}"> invite mediashare</a>
      </h1>`,
    };
    
    await this.userConnectionService.send(mail) 
    return res.status(HttpStatus.OK).json({
      statusCode: 200
    });
  }
}
