import { Body, Controller, Get, HttpCode, HttpStatus, Post, UnauthorizedException, UseGuards, Req, Res, Put } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser, GetUserId } from '@api-core/decorators/user.decorator';
import { JwtAuthGuard } from '@api-modules/auth/guards/jwt-auth.guard';
import { UserService } from '@api-modules/auth/user.service';
import { PlaylistService } from '../playlist/playlist.service';
import { UserGetResponse, UserPostResponse } from './decorators/user-response.decorator';

import { SessionUserInterface } from '@api-core/models/auth-user.model';
import { MediaItemResponseDto } from '../media-item/dto/media-item-response.dto';
import { ShareItemService } from '@api-modules/share-item/share-item.service';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';
import { MediaItemService } from '../media-item/media-item.service';
import { ObjectId } from 'mongodb';
import { PlaylistGetResponse } from '../playlist/playlist.decorator';
import { PlaylistResponseDto } from '../playlist/dto/playlist-response.dto';
import { UserGuard } from '@api-modules/auth/guards/user.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileDto } from './dto/profile.dto';
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
    return await this.userService.getUserById(userId);
  }

  @Put()
  @UserPostResponse()
  @ApiBody({ type: UpdateUserDto })
  async update(@GetUserId() userId: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser({ userId, updateUserDto });
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
    return await this.playlistService.getPlaylistsByUserId({ userId });
  }

  @Get('media-items')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @UserGetResponse({ type: MediaItemResponseDto, isArray: true })
  async getMediaItems(@GetUserId() userId: ObjectId) {
    return await this.mediaItemService.findMediaItemsByUserId(userId);
  }

  @Get('media-items/shared')
  @UserGetResponse({ type: MediaItemResponseDto, isArray: true })
  async getSharedMediaItems(@GetUser() user: SessionUserInterface = null) {
    const { _id: userId } = user;
    return await this.shareItemService.aggregateSharedMediaItems({ userId });
  }
  @Get('playlists/shared')
  @UserGetResponse({ isArray: true, type: ShareItem })
  async getSharedPlaylists(@GetUser() user: SessionUserInterface = null) {
    const { _id: userId } = user;
    return await this.shareItemService.aggregateSharedPlaylists({ userId });
  }

  @Get('media-items/shares')
  @UserGetResponse({ type: MediaItemResponseDto, isArray: true })
  async getSharesMediaItems(@GetUser() user: SessionUserInterface = null) {
    const { _id: userId } = user;
    return await this.shareItemService.aggregateSharedMediaItems({ userId });
  }
  @Get('playlists/shares')
  @UserGetResponse({ isArray: true, type: ShareItem })
  async getSharesPlaylists(@GetUser() user: SessionUserInterface = null) {
    const { _id: userId } = user;
    return await this.shareItemService.aggregateSharesPlaylists({ createdBy: userId });
  }

  @HttpCode(HttpStatus.OK)
  @Post('authorize')
  @ApiResponse({ type: ProfileDto, status: 200, isArray: false })
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
        // TODO: Replace this string!
        imageSrc: 'https://res.cloudinary.com/baansaowanee/image/upload/v1632212064/default_avatar_lt0il8.jpg',
      });
      const profile = await this.userService.getUserById(newUser._id);
      if (!profile) return res.send(user);
      return res.send(profile);
    }
    const profile = await this.userService.getUserById(user._id);
    console.log(profile);
    if (!profile) return res.send(user);

    return res.send(profile);
  }
}
