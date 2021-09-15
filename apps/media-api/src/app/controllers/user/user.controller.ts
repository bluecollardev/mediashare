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
import { PlaylistGetResponse } from '../playlist/playlist.decorator';
import { PlaylistResponseDto } from '../playlist/dto/playlist-response.dto';

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

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    return res.status(HttpStatus.OK).send();
  }

  @Get('playlists')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @PlaylistGetResponse({ isArray: true, type: PlaylistResponseDto })
  async getUserPlaylists(@GetUser() user: SessionUserInterface, @GetUserId() userId: ObjectId) {
    const result = await this.playlistService.getPlaylistByUserId({ userId: user._id });
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
  @Get('playlists/shared')
  @UserGetResponse({ isArray: true, type: ShareItem })
  async getMyShareItems(@GetUser() user: SessionUserInterface = null) {
    const { _id: userId } = user;

    return await this.shareItemService.aggregateSharedPlaylists({ userId });
  }

  @HttpCode(HttpStatus.OK)
  @Post('authorize')
  @ApiResponse({ type: LoginResponseDto, status: 200 })
  async authorize(@Req() req: Request) {
    console.log(req);
    const { token = null } = req.body as any;

    const valid = await this.userService.validateToken({ token });

    if (!valid) throw new UnauthorizedException();
    const user = await this.userService.findOne(valid._id);

    return { ...user };
  }
}
