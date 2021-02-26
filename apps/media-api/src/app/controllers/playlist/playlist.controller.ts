import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { PlaylistItemService } from '../../modules/playlist-item/services/playlist-item.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistService } from './services/playlist.service';

@Controller('playlist')
export class PlaylistController {
  constructor(
    private readonly playlistService: PlaylistService,
    private readonly playlistItemService: PlaylistItemService
  ) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    const { userId: dtoUserId, items: dtoItems } = createPlaylistDto;

    const userId = new ObjectId(dtoUserId);

    const items = dtoItems.map((dtoItem) => new ObjectId(dtoItem));

    return this.playlistService.create({ userId, items });
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
    // return this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(id);
  }
}
