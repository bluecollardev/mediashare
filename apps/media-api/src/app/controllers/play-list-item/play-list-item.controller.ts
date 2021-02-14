import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayListItemService } from './play-list-item.service';
import { CreatePlayListItemDto } from './dto/create-play-list-item.dto';
import { UpdatePlayListItemDto } from './dto/update-play-list-item.dto';
import { DataService } from '@api';
import { PlayListItem } from './entities/play-list-item.entity';

@Controller('play-list-item')
export class PlayListItemController {
  constructor(private readonly playListItemService: PlayListItemService) {}

  @Post()
  create(@Body() createPlayListItemDto: CreatePlayListItemDto) {
    return this.playListItemService.create(createPlayListItemDto);
  }

  @Get()
  findAll() {
    return this.playListItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playListItemService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlayListItemDto: UpdatePlayListItemDto
  ) {
    return this.playListItemService.update(+id, updatePlayListItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playListItemService.remove(+id);
  }
}
