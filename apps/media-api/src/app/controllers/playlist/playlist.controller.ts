import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { mapPlaylistItems } from '../../modules/playlist-item/functors/map-playlist-item.functor';
import { PlaylistItemService } from '../../modules/playlist-item/services/playlist-item.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistService } from './services/playlist.service';

@ApiTags('playlists')
@Controller('playlist')
export class PlaylistController {
  constructor(
    private readonly playlistService: PlaylistService,
    private readonly playlistItemService: PlaylistItemService
  ) {}

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
    // return this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(id);
  }
}
