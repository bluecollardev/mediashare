import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { MediaItemService } from '../media-item/media-item.service';
import { PlaylistService } from '../playlist/services/playlist.service';
import { LocalGuard } from './local.guard';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { GetUser } from '../../core/decorators/user.decorator';
import { User } from './entities/user.entity';
import { badRequestResponse } from '../../core/functors/http-errors.functor';
import { AuthUserInterface } from '@core-lib';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private playlistService: PlaylistService,
    private mediaItemService: MediaItemService,
    private shareItemService: ShareItemService
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
    const { sharedMediaItems } = await this.userService.findOne(user._id as string);

    const mediaItems = await this.mediaItemService.findPlaylistMedia(sharedMediaItems);

    return mediaItems;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/shared-playlists')
  async getSharedPlaylists(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    const { sharedPlaylists = [] } = user;

    const playlists = await this.mediaItemService.findPlaylistMedia(sharedPlaylists);

    return playlists;
  }

  @UseGuards(JwtAuthGuard)
  @Get('share-items')
  async getShareItems(@GetUser() user: User = null) {
    // return shareItems;
  }
}
