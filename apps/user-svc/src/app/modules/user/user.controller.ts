import { UseGuards } from '@nestjs/common';
import { Authentication, AuthenticationGuard, CognitoUser } from '@nestjs-cognito/auth';
import {
  Controller,
  Body,
  HttpStatus,
  Get,
  Post,
  Put,
  Req,
  Res,
  Param, Delete
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { ObjectIdPipe } from '@mediashare/shared';
import { handleErrorResponse, handleSuccessResponse } from '@mediashare/core/http/response';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserConnectionDto } from '../user-connection/dto/user-connection.dto';
import { CreateUserConnectionDto } from '../user-connection/dto/create-user-connection.dto';
// import { UpdateUserConnectionDto } from '../user-connection/dto/update-user-connection.dto';
import { UserConnectionService } from '../user-connection/user-connection.service';
import { UserDto } from './dto/user.dto';
import { InviteDto } from './dto/authorize.dto';
import { ProfileDto } from './dto/profile.dto';
import { UserService } from './user.service';
import { UserGetResponse, UserPostResponse } from './user.decorator';
import { UserGuard } from './user.guard';
import { GetUser } from '@mediashare/core/decorators/user.decorator';
import { ObjectId } from 'mongodb';

import { defaultImgUrl, defaultUserRole } from './user.constants';

@ApiTags('user')
@Authentication()
@Controller({ path: ['user'] })
export class UserController {
  constructor(
    private userService: UserService,
    private userConnectionService: UserConnectionService,
    /*private shareItemService: ShareItemService,
    private mediaItemService: MediaItemService*/
  ) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  // @ApiBody({ type: AuthorizeDto })
  // @ApiResponse({ type: ProfileDto, isArray: false, status: 200 })
  @Post('authorize')
  async authorize(@CognitoUser() cognitoUser, @Req() req: Request, @Res() res: Response) {
    const user = await this.userService.findByQuery({ where: { sub: cognitoUser.sub } });
    // res.setHeader('Authorization', accessToken);
    // res.setHeader('Id', idToken);
    if (!user) {
      const newUser = await this.userService.create({
        ...cognitoUser,
        role: defaultUserRole,
        imageSrc: defaultImgUrl,
      });
      const profile = await this.userService.findById(newUser._id);
      return handleSuccessResponse(res, 201, profile);
    }

    const profile = await this.userService.findById(user._id);
    return handleSuccessResponse(res, 200, profile);
  }

  @Post('invite')
  @ApiBody({ type: InviteDto })
  @ApiResponse({ type: ProfileDto, isArray: false, status: 200 })
  async invite(@Res() res: Response, @Body() inviteDto: InviteDto, ) {
    const newUser = await this.userService.create({
      email: inviteDto.email,
      username: inviteDto.username,
      role: 'subscriber',
      imageSrc: `${process.env['AWS_URL']}/assets/default-user.png`,
    } as CreateUserDto);
    const profile = await this.userService.findById(newUser._id);
    return res.send(profile);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    //req.logout();
    res.setHeader('Authorization', '');
    res.setHeader('Id', '');
    return res.status(HttpStatus.OK).send();
  }

  // TODO: Make sure only admins and test users can access this endpoint!
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post()
  @UserPostResponse({ type: UserDto })
  async createUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      // TODO: Only create if username and / or sub claim is unique!
      const result = await this.userService.create(createUserDto);
      return handleSuccessResponse(res, HttpStatus.CREATED, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @Get()
  @UserGetResponse({ type: UserDto }) // TODO: Change this back to ProfileDto
  async getCurrentUser(@Res() res: Response, @GetUser('_id') userId: ObjectId) {
    try {
      const result = await this.userService.findById(userId);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'userId', type: String, required: true })
  @Get(':userId')
  @UserGetResponse({ type: UserDto }) // TODO: Change this back to ProfileDto
  async getUser(@Res() res: Response, @Param('userId', ObjectIdPipe) userId: ObjectId) {
    try {
      const result = await this.userService.findById(userId);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @Put()
  @UserPostResponse({ type: UserDto })
  async updateCurrentUser(@Res() res: Response, @GetUser('_id') userId: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userService.update(userId, updateUserDto);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'userId', type: String, required: true })
  @ApiBody({ type: UpdateUserDto })
  @Put(':userId')
  @UserPostResponse({ type: UserDto })
  async updateUser(@Res() res: Response, @Param('userId', ObjectIdPipe) userId: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userService.update(userId, updateUserDto);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @Delete()
  async deleteCurrentUser(@Res() res: Response, @GetUser('_id') userId: ObjectId) {
    try {
      const result = await this.userService.remove(userId);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'userId', type: String, required: true })
  @Delete(':userId')
  async deleteUser(@Res() res: Response, @Param('userId', ObjectIdPipe) userId: ObjectId) {
    try {
      const result = await this.userService.remove(userId);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateUserConnectionDto })
  @Post('connections/create')
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

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @Get('connections')
  @UserGetResponse({ type: UserDto, isArray: true }) // TODO: Use ProfileDto
  async getCurrentUserConnections(@Res() res: Response, @GetUser('_id') userId: ObjectId) {
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

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('connections/:userId')
  @UserGetResponse({ type: UserDto, isArray: true }) // TODO: Use ProfileDto
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

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UserConnectionDto, isArray: false })
  @Post('connection/remove')
  async removeUserConnection(@Req() req: Request, @Res() res: Response, @Body() userConnectionDto: UserConnectionDto) {
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

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UserConnectionDto, isArray: true })
  @Post('connections/remove')
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


}
