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
  HttpCode,
  Request,
} from '@nestjs/common';
import { Response, Request as Req } from 'express';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { PlaylistService } from '../playlist/services/playlist.service';
import { MediaItemService } from '../media-item/media-item.service';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';

import * as R from 'remeda';
import { ObjectId } from 'mongodb';
import { conflictResponse, notFoundResponse } from '../../core/functors/http-errors.functor';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { LocalGuard } from '../../modules/auth/guards/local.guard';
import { UserGuard } from '../../modules/auth/guards/user.guard';
import { UserService } from '../../modules/auth/user.service';
import { BcRolesType, BC_ROLES } from 'libs/core/src/lib/models/roles.enum';
import { UserGetResponse, UserPostResponse } from './decorators/user-response.decorator';
import { createUserResponseDto } from './dto/create-user-response.dto';
import { Playlist } from '../playlist/entities/playlist.entity';
import { MediaItemDto } from '../media-item/dto/media-item.dto';
import { LoginDto } from './dto/login.dto';
import { ShareItem } from '../../modules/share-item/entities/share-item.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private playlistService: PlaylistService,
    private mediaItemService: MediaItemService,
    private shareItemService: ShareItemService
  ) {}

  @Post()
  @ApiResponse({ type: UserDto, status: 201, isArray: false })
  async create(@Body() createUserDto: CreateUserDto) {
    const { username, password, ...rest } = createUserDto;
    const existingUser = await this.userService.checkIfUserExists(username);
    if (existingUser) throw conflictResponse(username);

    const mongoUser = await this.userService.create({ ...rest, username });

    const postgresUser = await this.userService.createUser({ username, password, _id: mongoUser._id.toHexString() });

    return createUserResponseDto(mongoUser, postgresUser);
  }

  @UserGetResponse({ isArray: true })
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @Post('login')
  @ApiBody({ type: LoginDto, required: true })
  async login(@Request() req: Req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: Req, @Res() res: Response) {
    try {
      req.logout();
    } catch {
      return res.status(HttpStatus.OK).send();
    }
  }

  @Get(':id')
  @UserGetResponse()
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UserPostResponse()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(id);
  }

  @UseGuards(UserGuard)
  @Get(':id/playlists')
  @UserGetResponse({ type: Playlist, isArray: true })
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
  @UserGetResponse({ type: MediaItemDto, isArray: true })
  async getMedia(@Param('id') id: string, @Res() res: Response) {
    const mediaItems = await this.mediaItemService.findMediaItemsByUserId(id);

    if (!mediaItems || mediaItems.length < 1) return res.status(HttpStatus.NOT_FOUND).send([]);

    return res.status(HttpStatus.OK).send(mediaItems);
  }

  @Get(':id/shared-media-items')
  @UserGetResponse({ isArray: true, type: MediaItemDto })
  async getSharedMediaItems(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    const { sharedMediaItems = [] } = user;

    const mediaItems = await this.mediaItemService.findPlaylistMedia(sharedMediaItems);

    return mediaItems;
  }

  @Get(':id/shared-playlists')
  @UserGetResponse({ type: Playlist, isArray: true })
  async getSharedPlaylists(@Param('id') userId: string) {
    const { sharedPlaylists } = await this.userService.findOne(userId);

    const mediaItems = await this.mediaItemService.findPlaylistMedia(sharedPlaylists);
    const playlists = await this.playlistService.findPlaylistsByList(sharedPlaylists);

    return this.playlistService.mapPlaylists(playlists, mediaItems);
  }

  @Get(':id/share-items')
  @UserGetResponse({ type: ShareItem, isArray: true })
  async getShareItems(@Param('id') id: string) {
    const shareItems = this.shareItemService.findByQuery({ userId: new ObjectId(id) });

    return shareItems;
  }

  @Put(':id/roles')
  @UserPostResponse()
  @ApiBody({ enum: BC_ROLES, isArray: true })
  setRoles(@Param('id') id: string, @Body() params: { roles: BcRolesType[] }) {
    const { roles = [] } = params;
    return this.userService.setRoles(id, roles);
  }

  /* shared with others */
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post(':id/shared-items/:shareId')
  @ApiResponse({ type: UserDto, status: 200 })
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
