import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistItemService } from './playlist-item.service';
import { CreatePlaylistItemDto } from './dto/create-playlist-item.dto';
import { UpdatePlaylistItemDto } from './dto/update-playlist-item.dto';

@Controller('playlist-item')
export class PlaylistItemController {
  constructor(private readonly playlistItemService: PlaylistItemService) {}

  @Post()
  create(@Body() createPlaylistItemDto: CreatePlaylistItemDto) {
    return this.playlistItemService.create(createPlaylistItemDto);
  }

  @Get()
  findAll() {
    return this.playlistItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistItemService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistItemDto: UpdatePlaylistItemDto
  ) {
    return this.playlistItemService.update(id, updatePlaylistItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistItemService.remove(id);
  }
}
