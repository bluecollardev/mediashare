import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UnauthorizedException, UseGuards, Req, Res, Put } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser, GetUserId } from '../../core/decorators/user.decorator';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { UserService } from '../../modules/auth/user.service';
import { PlaylistService } from '../playlist/services/playlist.service';
import { UserGetResponse, UserPostResponse } from './decorators/user-response.decorator';

import { SessionUserInterface } from '../../core/models/auth-user.model';
import { MediaItemDto } from '../media-item/dto/media-item.dto';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { ShareItem } from '../../modules/share-item/entities/share-item.entity';
import { MediaItemService } from '../media-item/media-item.service';
import { ObjectId } from 'mongodb';
import { PlaylistGetResponse } from '../playlist/playlist.decorator';
import { PlaylistResponseDto } from '../playlist/dto/playlist-response.dto';
import { UserGuard } from '../../modules/auth/guards/user.guard';
import { User } from './entities/user.entity';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectIdPipe } from '@mediashare/shared';
import { ProfileDto } from './dto/profile.dto';
import * as R from 'remeda';
import { AuthorizeDto } from './dto/authorize.dto';

@ApiTags('user')
@Controller({ path: ['user'] })
export class UserController {
  constructor(
    private userService: UserService,
    private playlistService: PlaylistService,
    private shareItemService: ShareItemService,
    private mediaItemService: MediaItemService
  ) {}

  @Get()
  @UserGetResponse({ type: ProfileDto })
  async getUser(@GetUserId() userId: ObjectId) {
    const user = await this.userService.getUserById(userId);

    return user;
  }

  @Put()
  @UserPostResponse()
  @ApiBody({ type: UpdateUserDto })
  update(@GetUserId() userId: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ userId, updateUserDto });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.setHeader('Authorization', '');
    res.setHeader('Id', '');
    return res.status(HttpStatus.OK).send();
  }

  @Get('playlists')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @PlaylistGetResponse({ isArray: true, type: PlaylistResponseDto })
  async getUserPlaylists(@GetUserId() userId: ObjectId) {
    const result = await this.playlistService.getPlaylistByUserId({ userId });
    return result;
  }

  @Get('media-items')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @UserGetResponse({ type: MediaItemDto, isArray: true })
  async getMediaItems(@GetUserId() userId: ObjectId) {
    const result = await this.mediaItemService.findMediaItemsByUserId(userId);

    return result;
  }

  @Get('media-items/shared')
  @UserGetResponse({ type: MediaItemDto, isArray: true })
  getSharedMediaItems(@GetUser() user: SessionUserInterface = null) {
    const { _id: userId } = user;

    return this.shareItemService.aggregateSharedMediaItems({ userId });
  }
  @Get('playlists/shared')
  @UserGetResponse({ isArray: true, type: ShareItem })
  async getMyShareItems(@GetUser() user: SessionUserInterface = null) {
    const { _id: userId } = user;

    return await this.shareItemService.aggregateSharedPlaylists({ userId });
  }

  @HttpCode(HttpStatus.OK)
  @Post('authorize')
  @ApiResponse({ type: UserDto, status: 200, isArray: false })
  @ApiBody({ type: AuthorizeDto })
  async authorize(@Req() req: Request, @Res() res: Response) {
    console.log(req);
    const { accessToken = null, idToken = null } = req.body as any;

    const valid = this.userService.validateToken({ token: accessToken, idToken });

    if (!valid) throw new UnauthorizedException();
    const user = await this.userService.findByQuery({ sub: valid.sub });

    res.setHeader('Authorization', accessToken);
    res.setHeader('Id', idToken);
    if (!user) {
      const newUser = await this.userService.create({
        ...valid,
        role: 'user',
        imageSrc: 'https://res.cloudinary.com/baansaowanee/image/upload/v1632212064/default_avatar_lt0il8.jpg'
      });
      return res.send(newUser);
    }

    return res.send(user);
  }
}
