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
import * as R from 'remeda';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private mediaItemService: MediaItemService,
    private shareItemService: ShareItemService,
    private playlistService: PlaylistService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('share-items')
  async getMyShareItems(@GetUser() user: User = null) {
    const { _id: userId } = user;

    const items = await this.shareItemService.findOne(typeof userId === 'string' ? userId : userId.toHexString());

    return items ?? [];
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('authorize/:id')
  async authorize(@Param() id: string, @Body() body: { token: string }) {
    const { token = null } = body;
    const valid = await this.userService.validateUser({ token, _id: id });
    if (!valid) throw new UnauthorizedException();
    return valid;
  }

  @UseGuards(JwtAuthGuard)
  @Get('shared-media-items')
  async getSharedMediaItems(@GetUser() user: AuthUserInterface = null) {
    const { _id = null } = user;
    const { sharedMediaItems = [] } = await this.userService.findAllSharedMediaItemsByUserId(_id);
    const mediaItems = await this.mediaItemService.findPlaylistMedia(sharedMediaItems);
    return mediaItems;
  }

  @UseGuards(JwtAuthGuard)
  @Get('shared-playlists')
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
  async getShareItems(@GetUser() user: User = null) {
    // return shareItems;
  }
}
