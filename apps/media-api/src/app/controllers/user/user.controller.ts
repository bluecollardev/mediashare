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
import { ApiTags } from '@nestjs/swagger';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { MediaItemService } from '../media-item/media-item.service';
import { GetUser } from '../../core/decorators/user.decorator';
import { User } from './entities/user.entity';
import { AuthUserInterface } from '@core-lib';
import { ObjectId } from 'mongodb';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { UserService } from '../../modules/auth/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
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
    const { _id = null } = user;
    const userId = typeof _id === 'string' ? new ObjectId(_id) : _id;
    const { sharedMediaItems } = await this.userService.findByQuery({ _id: userId });

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

    const playlists = await this.mediaItemService.findPlaylistMedia(sharedPlaylists);

    return playlists;
  }

  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  @UseGuards(JwtAuthGuard)
  @Get('share-items')
  async getShareItems(@GetUser() user: User = null) {
    // return shareItems;
  }
}
