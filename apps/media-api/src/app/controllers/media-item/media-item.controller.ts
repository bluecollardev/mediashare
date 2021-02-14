import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { MediaItemService } from './media-item.service';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { UpdateMediaItemDto } from './dto/update-media-item.dto';

@Controller('media-item')
export class MediaItemController {
  constructor(private readonly mediaItemService: MediaItemService) {}

  @Post()
  create(@Body() createMediaItemDto: CreateMediaItemDto) {
    return this.mediaItemService.create(createMediaItemDto);
  }

  @Get()
  findAll() {
    return this.mediaItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaItemService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMediaItemDto: UpdateMediaItemDto
  ) {
    return this.mediaItemService.update(id, updateMediaItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaItemService.remove(id);
  }
}
