import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthUserInterface } from '@core-lib';

import { ApiTags } from '@nestjs/swagger';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { MediaItemService } from '../media-item/media-item.service';
import { GetUser } from '../../core/decorators/user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { UserService } from '../../modules/auth/user.service';
import { PlaylistService } from '../playlist/services/playlist.service';
import { UserGetResponse } from './decorators/user-response.decorator';
import { ShareItem } from '../../modules/share-item/entities/share-item.entity';
import { TokenDto } from './dto/login.dto';
import { MediaItemDto } from '../media-item/dto/media-item.dto';
import { Playlist } from '../playlist/entities/playlist.entity';
import { SessionUserInterface } from '../../core/models/auth-user.model';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private mediaItemService: MediaItemService,
    private shareItemService: ShareItemService,
    private playlistService: PlaylistService
  ) {}

  @Get()
  @UserGetResponse()
  async getUser(@GetUser() user: AuthUserInterface) {
    const { _id = null } = user;

    const mongoUser = await this.userService.findOne(_id as string);

    const authUser = await this.userService.getAuthUser({ _id: _id as string });
    return { ...authUser, ...mongoUser };
  }

  @Get('playlists')
  async getPlaylists(@GetUser() user: SessionUserInterface) {
    return this.playlistService.findByUserId(user._id);
  }

  @Get('share-items')
  @UserGetResponse({ isArray: true, type: ShareItem })
  async getMyShareItems(@GetUser() user: User = null) {
    const { _id: userId } = user;

    const items = await this.shareItemService.findOne(typeof userId === 'string' ? userId : userId.toHexString());

    return items ?? [];
  }

  @UseGuards(JwtAuthGuard)
  @Get('shared-media-items')
  @UserGetResponse({ type: MediaItemDto, isArray: true })
  async getSharedMediaItems(@GetUser() user: AuthUserInterface = null) {
    const { _id = null } = user;
    const { sharedMediaItems = [] } = await this.userService.findAllSharedMediaItemsByUserId(_id);
    const mediaItems = await this.mediaItemService.findPlaylistMedia(sharedMediaItems);
    return mediaItems;
  }

  @UseGuards(JwtAuthGuard)
  @Get('shared-playlists')
  @UserGetResponse({ type: Playlist, isArray: true })
  async getSharedPlaylists(
    @GetUser()
    user: AuthUserInterface
  ) {
    const { _id } = user;
    const userId = typeof _id === 'string' ? _id : _id.toHexString();

    const { sharedPlaylists } = await this.userService.findOne(userId);

    const mediaItems = await this.mediaItemService.findPlaylistMedia(sharedPlaylists);

    const playlists = await this.playlistService.findPlaylistsByList(sharedPlaylists);

    return this.playlistService.mapPlaylists(playlists, mediaItems);
  }

  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  @UseGuards(JwtAuthGuard)
  @Get('share-items')
  getShareItems() {
    // return shareItems;

    return;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('authorize')
  async authorize(@Param(':id') id: string, @Body() body: TokenDto) {
    const { token = null } = body;
    const valid = await this.userService.validateUser({ token, _id: id });
    if (!valid) throw new UnauthorizedException();
    return valid;
  }
}
