import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MediaItemService } from './media-item.service';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { UpdateMediaItemDto } from './dto/update-media-item.dto';

import { badRequest, notFoundRequest } from '../../core/functors/http-errors.functor';

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
  async findOne(@Param('id') id: string) {
    if (typeof id !== 'string') throw badRequest(`${id} must be of type string`);

    const mediaItem = await this.mediaItemService.findOne(id);

    if (!mediaItem) throw notFoundRequest('mediaItem', { args: { id } });
    return mediaItem;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMediaItemDto: UpdateMediaItemDto) {
    return this.mediaItemService.update(id, updateMediaItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.mediaItemService.remove(id);

    if (!deleted) throw notFoundRequest(id);

    return deleted;
  }
}
