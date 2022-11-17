import { Controller, Body, UseGuards, HttpCode, HttpStatus, UnauthorizedException, Get, Post, Put, Req, Res, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StringIdGuard } from '@util-lib';
import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import { JwtAuthGuard } from '@api-modules/auth/guards/jwt-auth.guard';
import { GetUserId } from '@api-core/decorators/user.decorator';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';
import { UserGetResponse, UserPostResponse } from './user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileDto } from './dto/profile.dto';
import { AuthorizeDto, InviteDto } from './dto/authorize.dto';
import { UpdateUserConnectionDto } from '@api-modules/user-connection/dto/update-user-connection.dto';
import { UserConnectionService } from '@api-modules/user-connection/user-connection.service';
import { ShareItemService } from '@api-modules/share-item/share-item.service';
import { MediaItemService } from '@api-modules/media-item/media-item.service';
import { MediaItemResponseDto } from '@api-modules/media-item/dto/media-item-response.dto';
import { UserConnectionDto } from '@api-modules/user-connection/dto/user-connection.dto';
import renderInvitationEmailTemplate from '@api-modules/user-connection/invitation-email.template';

@ApiTags('user')
@Controller({ path: ['user'] })
export class UserController {
  constructor(
    private userService: UserService,
    private userConnectionService: UserConnectionService,
    private shareItemService: ShareItemService,
    private mediaItemService: MediaItemService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('authorize')
  @ApiResponse({ type: ProfileDto, isArray: false, status: 200 })
  @ApiBody({ type: AuthorizeDto })
  async authorize(@Req() req: Request, @Res() res: Response) {
    const { accessToken = null, idToken = null } = req.body as any;
    const valid = this.userService.validateToken({ token: accessToken, idToken });
    if (!valid) throw new UnauthorizedException();
    const user = await this.userService.findByQuery({ sub: valid.sub } as any);

    res.setHeader('Authorization', accessToken);
    res.setHeader('Id', idToken);
    if (!user) {
      const newUser = await this.userService.create({
        ...valid,
        role: 'subscriber',
        // TODO: Replace this string!
        imageSrc: 'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/assets/default-user.png',
      });
      const profile = await this.userService.getUserById(newUser._id.toString());
      if (!profile) return res.send(user);
      return res.send(profile);
    }
    const profile = await this.userService.getUserById(user._id.toString());
    if (!profile) return res.send(user);

    return res.send(profile);
  }

  @Post('invite')
  @ApiBody({ type: InviteDto })
  @ApiResponse({ type: ProfileDto, isArray: false, status: 200 })
  async invite(@Body() InviteDto: InviteDto, @Res() res: Response) {
    const newUser = await this.userService.create({
      email: InviteDto.email,
      username: InviteDto.username,
      role: 'subscriber',
      imageSrc: 'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/assets/default-user.png',
    });
    const profile = await this.userService.getUserById(StringIdGuard(newUser._id));
    return res.send(profile);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    // req.logout();
    res.setHeader('Authorization', '');
    res.setHeader('Id', '');
    return res.status(HttpStatus.OK).send();
  }

  @Get()
  @UserGetResponse({ type: ProfileDto })
  async getUser(@GetUserId() userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Put()
  @UserPostResponse()
  @ApiBody({ type: UpdateUserDto })
  async updateUser(@GetUserId() userId: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser({ userId, updateUserDto });
  }

  @Get('media-items')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @UserGetResponse({ type: MediaItemResponseDto, isArray: true })
  async getUserMediaItems(@GetUserId() userId: ObjectId) {
    return await this.mediaItemService.getByUserId(userId);
  }

  @Get('connections')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @UserGetResponse({ type: UpdateUserConnectionDto, isArray: true })
  async getUserConnections(@GetUserId() userId: ObjectId) {
    const userConnections = await this.userConnectionService.getUserConnections(userId);
    const connectionUserIds = userConnections.map((uc) => uc.connectionId);
    return await this.userService.getUsersByIds(connectionUserIds);
  }

  @Post('connections/create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UserConnectionDto })
  async createUserConnection(@Req() req: Request, @Res() res: Response) {
    try {
      const { userId, connectionId } = req.body as any;
      const result = await this.userConnectionService.createUserConnection({ userId, connectionId });
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new error();
    }
  }

  @Post('connection/remove')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UserConnectionDto, isArray: false })
  async removeUserConnection(@Body() userConnectionDto: UserConnectionDto, @Req() req: Request, @Res() res: Response) {
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
      const result = await this.userConnectionService.removeUserConnection(userConnectionDto);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new error();
    }
  }

  @Post('connections/remove')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UserConnectionDto, isArray: true })
  async removeUserConnections(@Body() userConnectionDtos: UserConnectionDto[], @Req() req: Request, @Res() res: Response) {
    try {
      const shareItemsResult = await this.shareItemService.removeUserConnectionShareItems(userConnectionDtos);
      if (shareItemsResult) {
        const userConnectionResult = await this.userConnectionService.removeUserConnections(userConnectionDtos);
        return res.status(HttpStatus.OK).json(userConnectionResult);
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: `There was a problem removing user connection share items`
      });
    } catch (error) {
      throw new error();
    }
  }

  @Post('send-email')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'email', required: true })
  @ApiQuery({ name: 'userId', required: true })
  async sendEmail(@Query('email') email, @Query('userId') userId, @Res() res: Response) {
    try {
      if (!userId || !email) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
        });
      }
      // Does email already exist?
      const invitees = await this.userConnectionService.userEmailAlreadyExists(email);
      if (Array.isArray(invitees) && invitees.length > 0) {
        const createConnection = (invitee) => async () => {
          const userConnection = await this.userConnectionService.createUserConnection({ userId, connectionId: invitee._id.toString() });
          console.log('Created new user connection');
          console.log(userConnection);
        };

        const createConnections: Promise<void>[] = [];
        invitees.filter((invitee) => userId !== invitee._id.toString()).forEach((invitee) => createConnections.push(createConnection(invitee)()));

        if (invitees.length > 0) {
          console.log('Email exists in the system, creating user connections');
        }

        await Promise.all(createConnections);
        return res.status(HttpStatus.OK).json({
          statusCode: 200,
        });
      } else {
        const user: ProfileDto = await this.userService.getUserById(userId);
        const mail = {
          to: email,
          subject: process.env['INVITATION_EMAIL_SUBJECT'],
          // Create new identity on AWS SES
          from: process.env['INVITATION_EMAIL_SENDER'],
          html: renderInvitationEmailTemplate(user),
        };
        console.log(`Sending email: ${email} ${userId}`);
        await this.userConnectionService.sendEmail(mail);
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
