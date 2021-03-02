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

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private playlistService: PlaylistService,
    private mediaItemService: MediaItemService,
    private shareItemService: ShareItemService
  ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return req.user;
  }
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      req.logout();
    } catch {
      return res.status(HttpStatus.OK).send();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('share-items')
  async getMyShareItems(@GetUser() user: User = null) {
    const { authId = null } = user;
    if (!authId) throw badRequestResponse('user not found');
    const { _id: userId = null } = await this.userService.findByQuery({ authId });
    return await this.shareItemService.findByQuery({ userId });
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
  async getSharedMediaItems(@GetUser() user: User = null) {
    // const user = await this.userService.findOne(id);

    const { sharedMediaItems = [] } = user;

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
