import { Controller, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { UserConnectionService } from './user-connection.service';
import { UserService } from '@api-modules/user/user.service';
import { ProfileDto } from '@api-modules/user/dto/profile.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserConnectionDto } from './dto/create-user-connection.dto';
import renderInvitationEmailTemplate from './invitation-email.template';

@ApiTags('user-connection')
@Controller('user-connection')
export class UserConnectionController {
  constructor(private readonly userConnectionService: UserConnectionService, private readonly userService: UserService) {}

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
    try {
      console.log(`Sending email: ${email} ${userId}`);

      // ====== email already exits
      // const isProfile = await this.userConnectionService.userEmailAlreadyExits(email);
      // if(isProfile != null)  {
      //   console.log('email already exits in db');
      //    await this.userConnectionService.createUserConnection({ userId, connectionId: isProfile._id.toString()});
      //    return res.status(HttpStatus.OK).json({
      //   statusCode: 200
      // });
      // }
      // ========================

      const user: ProfileDto = await this.userService.getUserById(userId);
      const mail = {
        to: email,
        subject: process.env['INVITATION_EMAIL_SUBJECT'],
        // Create new identity on AWS SES
        from: process.env['INVITATION_EMAIL_SENDER'],
        html: renderInvitationEmailTemplate(user),
      };
      await this.userConnectionService.send(mail);
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
      });
    }
  }
}
