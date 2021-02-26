import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';

import { MediaItemService } from './media-item.service';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { UpdateMediaItemDto } from './dto/update-media-item.dto';

import { badRequest, notFoundRequest } from '../../core/functors/http-errors.functor';
import { ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';

@ApiTags('media-items')
@Controller('media-item')
export class MediaItemController {
  constructor(private readonly mediaItemService: MediaItemService, private shareItemService: ShareItemService) {}

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

  @Post(':id/share/:userId')
  async share(@Param('id') id: string, @Param('userId') userId: string, @Res() response: Response) {
    const playlistItem = await this.mediaItemService.findOne(id);
    if (!playlistItem) return response.status(HttpStatus.NOT_FOUND);

    const { userId: createdById } = playlistItem;

    const shareItem = this.shareItemService.createMediaShareItem({
      createdBy: createdById.toHexString(),
      userId,
      mediaId: id,
    });

    return shareItem;
  }
}
