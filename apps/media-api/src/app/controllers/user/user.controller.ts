import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
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

import * as R from 'remeda';
import { ObjectId } from 'mongodb';
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private playlistService: PlaylistService,
    private playlistItemService: PlaylistItemService,
    private mediaItemService: MediaItemService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;
    const existingUser = await this.userService.checkIfUserExists(username);
    console.log(existingUser);
    if (existingUser) return existingUser;
    return await this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
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
    const playlistItems = await this.playlistItemService.findByUserId(id);
    if (!playlistItems || playlistItems.length < 1) return res.status(HttpStatus.NOT_FOUND).send([]);

    const playlists = await this.playlistService.findByUserId(id);

    const mediaIds = R.reduce(
      R.map(playlists, (item) => item.items),
      (prev, curr) => [...prev, ...curr],
      []
    );
    const uniqIds: string[] = R.uniqBy(mediaIds, (item) => item.toHexString());
    const mediaItems = await this.mediaItemService.findPlaylistMedia(uniqIds);

    const indexedMediaItems = R.indexBy(mediaItems, (item) => item._id);
    const mapped = R.map(playlists, (playlist) => ({
      ...playlist,
      items: playlist?.items.map((item) => indexedMediaItems[item.toHexString()]) || [],
    }));

    return res.status(HttpStatus.OK).send(mapped);
  }

  @Get(':id/media-items')
  async getMedia(@Param('id') id: string, @Res() res: Response) {
    const mediaItems = await this.mediaItemService.findMediaItemsByUserId(id);

    if (!mediaItems || mediaItems.length < 1) return res.status(HttpStatus.NOT_FOUND).send([]);

    return res.status(HttpStatus.OK).send(mediaItems);
  }
}
