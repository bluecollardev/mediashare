import { Query } from '@nestjs/common';
import { Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
// import { ProfileDto } from '../../../../../../openapi/clients/user-svc/rxjs-api';
import { UserConnectionService } from '../user-connection/user-connection.service';
import { UserService } from '../user/user.service';
import { SesService } from '../nestjs-ses';
import renderInvitationEmailTemplate from './invitation-email.template';

@ApiTags('email')
@Controller({ path: ['email'] })
export class EmailController {
  constructor(
    private sesService: SesService,
    private userService: UserService,
    private userConnectionService: UserConnectionService
  ) {}

  @Post('send-email')
  @ApiQuery({
    name: 'userId',
    required: true,
    description: 'The userId of the currently logged in user',
  })
  @ApiQuery({
    name: 'email',
    required: true,
    description: 'The email address to send the invitation to',
  })
  async sendEmail(
    @Res() res: Response,
    @Query('userId') userId: string,
    @Query('email') email: string
  ) {
    try {
      if (!userId || !email) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
        });
      }

      // TODO: Does email already exist?
      // Note that we can have multiple matching users to a single email, as a single user can currently have
      // multiple accounts with different user names corresponding to a single email address.
      // We do this so that I can personally test this with multiple accounts, I don't want to have to create a bunch of
      // fake email addresses to test when I can just use my own existing accounts.
      // In the future, we'll probably want to only allow a single account per email. To do this updates are also required
      // in our AWS Cognito user pool.
      const matchingUsers = await this.userService.findByEmail(email);
      const hasMatchingUsers =
        Array.isArray(matchingUsers) && matchingUsers.length > 0;

      const emailSubject = process.env['INVITATION_EMAIL_SUBJECT'];
      const emailFrom = process.env['INVITATION_EMAIL_SENDER'];

      const createAndSendEmail = async (email: string) => {
        // TODO: Fix this type!
        const currentUser = (await this.userService.findById(
          userId
        )) as unknown as any;
        const mail = {
          to: email,
          subject: emailSubject,
          from: emailFrom,
          // TODO: Fix this type!
          html: renderInvitationEmailTemplate(currentUser as any, email),
        };
        console.log(
          `Sending email invitation on behalf on ${currentUser.email} [${userId}] to: ${email} `
        );
        await this.sesService.sendEmail(mail);
      };

      // Does the user receiving the invitation already have an account?
      if (hasMatchingUsers) {
        // If matching users we need to send an email invitation
        // Get all existing user connections
        const currentUserConnections =
          await this.userConnectionService.findConnections(userId);
        // For each matching user account, send out an email invitation
        const invitationsToSend = matchingUsers
          // A user cannot be both the sender and the recipient of an invitation
          // TODO: Throw some kind of validation error if this occurs so the user can react to it
          .filter((invitee) => userId !== invitee._id.toString())
          // Remove any recipients that are already connections
          // .filter((invitee) => !currentUserConnections.find((connection) => connection.connectionId === invitee._id))
          // And send out the emails
          .map((invitee) => createAndSendEmail(invitee.email));

        await Promise.all(invitationsToSend);
        return res.status(HttpStatus.OK).json({
          statusCode: 200,
        });
      } else {
        await createAndSendEmail(email);
        return res.status(HttpStatus.OK).json({
          statusCode: 200,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
      });
    }
  }
}
