import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UnauthorizedException, UseGuards, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser, GetUserId } from '../../core/decorators/user.decorator';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { UserService } from '../../modules/auth/user.service';
import { PlaylistService } from '../playlist/services/playlist.service';
import { UserGetResponse } from './decorators/user-response.decorator';
import { LoginDto, LoginResponseDto, TokenDto } from './dto/login.dto';
import { SessionUserInterface } from '../../core/models/auth-user.model';
import { MediaItemDto } from '../media-item/dto/media-item.dto';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { ShareItem } from '../../modules/share-item/entities/share-item.entity';
import { MediaItemService } from '../media-item/media-item.service';
import { ObjectId } from 'mongodb';
import { LocalGuard } from '../../modules/auth/guards/local.guard';
import { Playlist } from '../playlist/entities/playlist.entity';
import { PlaylistGetResponse } from '../playlist/playlist.decorator';
import { PlaylistItemResponseDto } from '../playlist/dto/playlist-response.dto';
import { UserGuard } from '../../modules/auth/guards/user.guard';
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
  @UserGetResponse()
  async getUser(@GetUser() user: SessionUserInterface) {
    const { _id = null } = user;

    const [mongoUser, authUser] = await Promise.all([this.userService.findOne(_id), this.userService.getAuthUser({ _id })]);
    return { ...authUser, ...mongoUser };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @Post('login')
  @ApiBody({ type: LoginDto, required: true })
  @ApiResponse({ type: LoginResponseDto, status: 200 })
  async login(@Req() req: Request) {
    const expressUser = req.user as any;

    const user = await this.userService.findByQuery({ username: req.body.username.toLowerCase() });
    return { accessToken: expressUser.accessToken.accessToken, ...user };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      req.logout();
    } catch {
      return res.status(HttpStatus.OK).send();
    }
  }

  @Get('playlists')
  @UseGuards(UserGuard, JwtAuthGuard)
  @ApiBearerAuth()
  @PlaylistGetResponse({ isArray: true, type: PlaylistItemResponseDto })
  async getUserPlaylists(@GetUser() user: SessionUserInterface) {
    console.log('🚀 ----------------------------------------------------------------------------------------');
    console.log('🚀 ~ file: user.controller.ts ~ line 68 ~ UserController ~ getUserPlaylists ~ user', user);
    console.log('🚀 ----------------------------------------------------------------------------------------');

    const result = user._id ? await this.playlistService.getPlaylistByUserId({ userId: user._id }) : await this.playlistService.findAll();

    return result;
  }

  @Get('media-items')
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
  @UseGuards(JwtAuthGuard)
  @Get('playlists/shared')
  @UserGetResponse({ isArray: true, type: ShareItem })
  async getMyShareItems(@GetUser() user: SessionUserInterface = null) {
    const { _id: userId } = user;

    return await this.shareItemService.aggregateSharedPlaylists({ userId });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('authorize')
  async authorize() {
    // const valid = await this.userService.validateToken({ token, _id: id });
    // if (!valid) throw new UnauthorizedException();
    // return valid;
  }
}
