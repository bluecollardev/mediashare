import { Controller, Body, UseGuards, HttpCode, HttpStatus, UnauthorizedException, Get, Post, Put, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import { JwtAuthGuard } from '@api-modules/auth/guards/jwt-auth.guard';
import { GetUserId } from '@api-core/decorators/user.decorator';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';
import { UserGetResponse, UserPostResponse } from './user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileDto } from './dto/profile.dto';
import { AuthorizeDto } from './dto/authorize.dto';
import { ShareItemService } from '@api-modules/share-item/share-item.service';
import { MediaItemService } from '@api-modules/media-item/media-item.service';
import { MediaItemResponseDto } from '@api-modules/media-item/dto/media-item-response.dto';
import { PlaylistService } from '@api-modules/playlist/playlist.service';
import { PlaylistGetResponse } from '@api-modules/playlist/playlist.decorator';
import { PlaylistResponseDto } from '@api-modules/playlist/dto/playlist-response.dto';

@ApiTags('user')
@Controller({ path: ['user'] })
export class UserController {
  constructor(
    private userService: UserService,
    private playlistService: PlaylistService,
    private shareItemService: ShareItemService,
    private mediaItemService: MediaItemService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('authorize')
  @ApiResponse({ type: ProfileDto, isArray: false, status: 200 })
  @ApiBody({ type: AuthorizeDto })
  async authorize(@Req() req: Request, @Res() res: Response) {
    const { accessToken = null, idToken = null } = req.body as any;
    const valid = this.userService.validateToken({ token: accessToken, idToken });
    if (!valid) throw new UnauthorizedException();
    const user = await this.userService.findByQuery({ sub: valid.sub });

    res.setHeader('Authorization', accessToken);
    res.setHeader('Id', idToken);
    if (!user) {
      const newUser = await this.userService.create({
        ...valid,
        role: 'subscriber',
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

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.setHeader('Authorization', '');
    res.setHeader('Id', '');
    return res.status(HttpStatus.OK).send();
  }

  @Get()
  @UserGetResponse({ type: ProfileDto })
  async getUser(@GetUserId() userId: ObjectId) {
    return await this.userService.getUserById(userId);
  }

  @Put()
  @UserPostResponse()
  @ApiBody({ type: UpdateUserDto })
  async updateUser(@GetUserId() userId: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser({ userId, updateUserDto });
  }

  @Get('playlists')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @PlaylistGetResponse({ type: PlaylistResponseDto, isArray: true })
  async getUserPlaylists(@GetUserId() userId: ObjectId) {
    return await this.playlistService.getByUserId(userId);
  }

  @Get('media-items')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @UserGetResponse({ type: MediaItemResponseDto, isArray: true })
  async getUserMediaItems(@GetUserId() userId: ObjectId) {
    return await this.mediaItemService.getByUserId(userId);
  }
}
