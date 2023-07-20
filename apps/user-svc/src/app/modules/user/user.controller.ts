import { defaultImgUrl } from './user.constants';
import {
  Controller,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Put,
  Req,
  Res,
  Param, Delete
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { ObjectIdPipe } from '@mediashare/shared';
import { handleErrorResponse, handleSuccessResponse } from '../../core/http/response';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserConnectionDto } from '../user-connection/dto/user-connection.dto';
import { CreateUserConnectionDto } from '../user-connection/dto/create-user-connection.dto';
// import { UpdateUserConnectionDto } from '../user-connection/dto/update-user-connection.dto';
import { UserConnectionService } from '../user-connection/user-connection.service';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserGetResponse, UserPostResponse } from './user.decorator';
import { GetUserId } from '../../core/decorators/user.decorator';
import { ObjectId } from 'mongodb';

@ApiTags('user')
@Controller({ path: ['user'] })
export class UserController {
  constructor(
    private userService: UserService,
    private userConnectionService: UserConnectionService,
    /*private shareItemService: ShareItemService,
    private mediaItemService: MediaItemService*/
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('authorize')
  // @ApiResponse({ type: ProfileDto, isArray: false, status: 200 })
  // @ApiBody({ type: AuthorizeDto })
  async authorize(@Req() req: Request, @Res() res: Response) {
    const { accessToken = null, idToken = null } = req.body as any;
    // const valid = this.userService.validateToken({ token: accessToken, idToken });
    // if (!valid) throw new UnauthorizedException();
    /* const user = await this.userService.findByQuery({ sub: valid.sub } as any);

    res.setHeader('Authorization', accessToken);
    res.setHeader('Id', idToken);
    if (!user) {
      const newUser = await this.userService.create({
        ...valid,
        // TODO: All new users should probably be free, not subscribers, complete this!
        role: 'subscriber',
        imageSrc: defaultImgUrl,
      });
    }
    const profile = await this.userService.findById(user._id); */
    return handleSuccessResponse(res, 200, {});
  }

  @Post('invite')
  // @ApiBody({ type: InviteDto })
  // @ApiResponse({ type: ProfileDto, isArray: false, status: 200 })
  // async invite(@Body() InviteDto: InviteDto, @Res() res: Response) {
  async invite(@Res() res: Response) {
    /*const newUser = await this.userService.create({
      email: InviteDto.email,
      username: InviteDto.username,
      role: 'subscriber',
      imageSrc: `${process.env['AWS_URL']}/assets/default-user.png`,
    });
    const profile = await this.userService.getUserById(StringIdGuard(newUser._id));
    return res.send(profile);*/
    return res.send('OK');
  }

  @Post('logout')
  // @UseGuards(JwtAuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    /* //req.logout();
    res.setHeader('Authorization', '');
    res.setHeader('Id', '');
    return res.status(HttpStatus.OK).send();*/
    return res.send('OK');
  }

  // TODO: Make sure only admins and test users can access this endpoint!
  // @UseGuards(AuthenticationGuard)
  @Post()
  @UserPostResponse({ type: UserDto })
  async createUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.create(createUserDto);
      return handleSuccessResponse(res, HttpStatus.CREATED, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // @UseGuards(AuthenticationGuard)
  @Get()
  @UserGetResponse({ type: UserDto }) // TODO: Change this back to ProfileDto
  async getCurrentUser(@Res() res: Response, @GetUserId() userId: string) {
    try {
      const result = await this.userService.findById(userId);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @Get(':userId')
  @ApiParam({ name: 'userId', type: String, required: true })
  @UserGetResponse({ type: UserDto }) // TODO: Change this back to ProfileDto
  async getUser(@Res() res: Response, @Param('userId', ObjectIdPipe) userId: ObjectId) {
    try {
      const result = await this.userService.findById(userId);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // @UseGuards(AuthenticationGuard)
  @Put()
  @UserPostResponse({ type: UserDto })
  @ApiBody({ type: UpdateUserDto })
  async updateCurrentUser(@Res() res: Response, @GetUserId() userId: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userService.update(userId, updateUserDto);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @Put(':userId')
  @ApiParam({ name: 'userId', type: String, required: true })
  @UserPostResponse({ type: UserDto })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(@Res() res: Response, @Param('userId', ObjectIdPipe) userId: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userService.update(userId, updateUserDto);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @Delete()
  async deleteCurrentUser(@Res() res: Response, @GetUserId() userId: string) {
    try {
      const result = await this.userService.remove(userId);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @Delete(':userId')
  @ApiParam({ name: 'userId', type: String, required: true })
  async deleteUser(@Res() res: Response, @Param('userId', ObjectIdPipe) userId: ObjectId) {
    try {
      const result = await this.userService.remove(userId);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // TODO: MOVE THIS OUT?
  @Get('media-items')
  // @UseGuards(UserGuard)
  // @ApiBearerAuth()
  // @UserGetResponse({ type: MediaItemResponseDto, isArray: true })
  async getUserMediaItems(@Res() res: Response, @GetUserId() userId: ObjectId) {
    /*const result = await this.mediaItemService.getByUserId(userId);*/
    return res.send('OK');
  }

  @Post('connections/create')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateUserConnectionDto })
  async createUserConnection(@Req() req: Request, @Res() res: Response) {
    try {
      // We do it this way instead of using the decorator on purpose
      const userConnectionDto: CreateUserConnectionDto = req.body;
      const result = await this.userConnectionService.create(userConnectionDto);
      return handleSuccessResponse(res, HttpStatus.CREATED, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // @Get('connections')
  @Get('connections/:userId')
  // @UseGuards(UserGuard)
  @ApiBearerAuth()
  @UserGetResponse({ type: UserDto, isArray: true }) // TODO: Use ProfileDto
  // async getUserConnections(@GetUserId() userId: ObjectId) {
  async getUserConnections(@Res() res: Response, @Param('userId', ObjectIdPipe) userId: ObjectId) {
    try {
      const userConnections = await this.userConnectionService.findConnections(userId);
      const connectionUserIds = userConnections.map((uc) => uc.connectionId)

      // TODO: Use mapper in findByIds
      const result = await this.userService.findByIds(connectionUserIds);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @Post('connection/remove')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiBody({ type: UserConnectionDto, isArray: false })
  async removeUserConnection(@Req() req: Request, @Res() res: Response, @Body() userConnectionDto: UserConnectionDto) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { userId, connectionId } = req.body as any;
      if (!userId || !connectionId) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: `User ID and Connection ID are required fields`,
        });
      }
      if (userId === connectionId) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: `User ID and Connection ID cannot be the same`,
        });
      }
      const result = await this.userConnectionService.remove(userConnectionDto);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @Post('connections/remove')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiBody({ type: UserConnectionDto, isArray: true })
  async removeUserConnections(@Req() req: Request, @Res() res: Response, @Body() userConnectionDtos: UserConnectionDto[]) {
    // eslint-disable-next-line no-useless-catch
    try {
      // TODO: Add this functionality back in
      // const shareItemsResult = await this.shareItemService.removeUserConnectionShareItems(userConnectionDtos);
      // if (shareItemsResult) {
      const userConnectionResult = await this.userConnectionService.removeMany(userConnectionDtos);
      return handleSuccessResponse(res, HttpStatus.OK, userConnectionResult);
      // }

      /* return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: `There was a problem removing user connection share items`,
      }); */
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // TODO: Move the mailing part out of here!
  /* @Post('send-email')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiQuery({ name: 'userId', required: true, description: 'The userId of the currently logged in user' })
  @ApiQuery({ name: 'email', required: true, description: 'The email address to send the invitation to' })
  async sendEmail(@Query('userId') userId, @Query('email') email, @Res() res: Response) {
    try {
      if (!userId || !email) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
        });
      }

      // Does email already exist?
      // Note that we can have multiple matching users to a single email, as a single user can currently have
      // multiple accounts with different user names corresponding to a single email address.
      // We do this so that I can personally test this with multiple accounts, I don't want to have to create a bunch of
      // fake email addresses to test when I can just use my own existing accounts.
      // In the future, we'll probably want to only allow a single account per email. To do this updates are also required
      // in our AWS Cognito user pool.
      const matchingUsers = await this.userConnectionService.findUsersByEmail(email);
      const hasMatchingUsers = Array.isArray(matchingUsers) && matchingUsers.length > 0;

      const emailSubject = process.env['INVITATION_EMAIL_SUBJECT'];
      const emailFrom = process.env['INVITATION_EMAIL_SENDER'];

      const createAndSendEmail = async (email) => {
        const currentUser: ProfileDto = await this.userService.getUserById(userId);
        const mail = {
          to: email,
          subject: emailSubject,
          from: emailFrom,
          html: renderInvitationEmailTemplate(currentUser, email),
        };
        console.log(`Sending email invitation on behalf on ${currentUser.email} [${userId}] to: ${email} `);
        const result = await this.userConnectionService.sendEmail(mail);
      };

      // Does the user receiving the invitation already have an account?
      if (hasMatchingUsers) {
        // If matching users we need to send an email invitation
        // Get all existing user connections
        const currentUserConnections = await this.userConnectionService.findConnections(userId);
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
  } */
}
