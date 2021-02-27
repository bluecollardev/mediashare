import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistService } from './services/playlist.service';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';

@ApiTags('playlists')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService, private shareItemService: ShareItemService) {}

  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
    const { userId: dtoUserId, items: dtoItems, title = 'untitled' } = createPlaylistDto;

    const userId = new ObjectId(dtoUserId);

    const playlist = await this.playlistService.createPlaylist(userId, { mediaIds: dtoItems, title });

    return playlist;
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    const { userId, ...rest } = updatePlaylistDto;
    return this.playlistService.update(id, { ...rest, userId: new ObjectId(userId) });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(id);
  }

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
