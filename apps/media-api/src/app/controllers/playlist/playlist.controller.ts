import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistService } from './services/playlist.service';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { PLAYLIST_CATEGORY } from '@core-lib';
import { SessionUserInterface } from '../../core/models/auth-user.model';
import { GetUser } from '../../core/decorators/user.decorator';
import { PlaylistGetResponse, PlaylistPostResponse } from './playlist.decorator';
import { UseJwtGuard } from '../../modules/auth/auth.decorator';
import { ApiPostResponse } from '@mediashare/shared';
import { ShareItem } from '../../modules/share-item/entities/share-item.entity';
import { PlaylistCategoryDto } from './dto/playlist-category.dto';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService, private shareItemService: ShareItemService) {}

  @PlaylistPostResponse()
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto, @GetUser() user: SessionUserInterface) {
    const { items: dtoItems, title = 'untitled' } = createPlaylistDto;

    const userId = new ObjectId(user._id);

    const playlist = await this.playlistService.createPlaylist(userId, { mediaIds: dtoItems, title });

    return playlist;
  }

  @PlaylistGetResponse({ isArray: true })
  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get('categories')
  getCategories() {
    return { categories: PLAYLIST_CATEGORY };
  }

  @PlaylistGetResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    const { userId, ...rest } = updatePlaylistDto;
    return this.playlistService.update(id, { ...rest, userId: new ObjectId(userId) });
  }

  @UseJwtGuard()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(id);
  }

  @ApiPostResponse({ type: ShareItem, isArray: true })
  @Post(':id/share/:userId')
  async share(@Param('id') id: string, @Param('userId') userId: string, @Res() response: Response) {
    const playlistItem = await this.playlistService.findOne(id);
    if (!playlistItem) return response.status(HttpStatus.NOT_FOUND);

    const { userId: createdById, title } = playlistItem;

    const shareItem = await this.shareItemService.createPlaylistShareItem({
      createdBy: createdById.toHexString(),
      userId,
      playlistId: id,
      title,
    });

    return response.status(HttpStatus.CREATED).send(shareItem);
  }
}
