import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  UnauthorizedException,
  HttpCode,
  Session,
  Logger,
  Request,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { PlaylistService } from '../playlist/services/playlist.service';
import { PlaylistItemService } from '../../modules/playlist-item/services/playlist-item.service';
import { MediaItemService } from '../media-item/media-item.service';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';

import * as R from 'remeda';
import { ObjectId } from 'mongodb';
import { badRequestResponse, notFoundResponse } from '../../core/functors/http-errors.functor';
import { UserGuard } from '../../core/guards/user.guard';
import { GetUser } from '../../core/decorators/user.decorator';
import { LocalGuard } from './local.guard';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private playlistService: PlaylistService,
    private playlistItemService: PlaylistItemService,
    private mediaItemService: MediaItemService,
    private shareItemService: ShareItemService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { username, password, ...rest } = createUserDto;
    const existingUser = await this.userService.checkIfUserExists(username);
    if (existingUser) return existingUser;

    const postgresUser = await this.userService.createUser({ username, password });

    const mongoUser = await this.userService.create({ ...rest, username, authId: postgresUser._id });

    return mongoUser;
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(UserGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('share-items')
  async getMyShareItems(@GetUser() user: User = null) {
    console.log(user);
    const { authId = null } = user;
    if (!authId) throw badRequestResponse('user not found');
    const userProfile = await this.userService.findByQuery({ authId });
    return { user, userProfile };
  }

  @HttpCode(HttpStatus.OK)
  @Post('authorize/:id')
  async authorize(@Param() id: string, @Body() body: { token: string }) {
    const { token = null } = body;
    const valid = await this.userService.validateUser({ token, _id: id });
    if (!valid) throw new UnauthorizedException();
    return valid;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(id);
  }

  @Get(':id/playlists')
  async getPlaylists(@Param('id') id: string, @Res() res: Response) {
    const playlists = await this.playlistService.findByUserId(id);

    if (!playlists || playlists.length < 1) return res.status(HttpStatus.NOT_FOUND).send([]);

    const mediaIdsTuple = R.pipe(
      playlists,
      R.map((playlist) => playlist.items),
      R.map((playlistItems) => R.map(playlistItems, (item) => item.mediaId))
    );

    const mediaIds = R.reduce(mediaIdsTuple, (prev, curr) => [...prev, ...curr], []);

    const mediaItems = await this.mediaItemService.findPlaylistMedia(mediaIds);

    const indexedMediaItems = R.indexBy(mediaItems, (item) => item._id);

    const mapped = R.map(playlists, (playlist) => ({
      ...playlist,
      mediaItems: playlist?.items.map((item) => indexedMediaItems[item.mediaId.toHexString()]) || [],
    }));

    return res.status(HttpStatus.OK).send(mapped);
  }

  @Get(':id/media-items')
  async getMedia(@Param('id') id: string, @Res() res: Response) {
    const mediaItems = await this.mediaItemService.findMediaItemsByUserId(id);

    if (!mediaItems || mediaItems.length < 1) return res.status(HttpStatus.NOT_FOUND).send([]);

    return res.status(HttpStatus.OK).send(mediaItems);
  }

  @Get(':id/shared-media-items')
  async getSharedMediaItems(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    const { sharedMediaItems = [] } = user;

    const mediaItems = await this.mediaItemService.findPlaylistMedia(sharedMediaItems);

    return mediaItems;
  }

  @Get(':id/shared-playlists')
  async getSharedPlaylists(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    const { sharedPlaylists = [] } = user;

    const playlists = await this.mediaItemService.findPlaylistMedia(sharedPlaylists);

    return playlists;
  }

  @Get(':id/share-items')
  async getShareItems(@Param('id') id: string) {
    const shareItems = this.shareItemService.findByQuery({ userId: new ObjectId(id) });

    return shareItems;
  }

  /* shared with others */
  async readSharedItem(@Param('id') id: string, @Param('shareId') shareId: string) {
    const sharedItem = await this.shareItemService.update(shareId, { read: true });

    const { mediaId = null, playlistId = null } = sharedItem;

    const user = await this.userService.findOne(id);

    if (mediaId) {
      const { sharedMediaItems = [] } = user;
      const updatedUser = await this.userService.update(id, { sharedMediaItems: [...sharedMediaItems, mediaId] });
      return updatedUser;
    }
    if (playlistId) {
      const { sharedPlaylists = [] } = user;
      const updatedUser = await this.userService.update(id, { sharedPlaylists: [...sharedPlaylists, playlistId] });
      return updatedUser;
    }
    throw notFoundResponse('no content Id on shared Item');
  }
}
