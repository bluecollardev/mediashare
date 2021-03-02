import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { MediaItemService } from './media-item.service';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { UpdateMediaItemDto } from './dto/update-media-item.dto';

import { badRequestResponse, notFoundResponse } from '../../core/functors/http-errors.functor';

import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { MEDIA_CATEGORY } from '@core-lib';

@ApiTags('media-items')
@Controller('media-items')
export class MediaItemController {
  constructor(private readonly mediaItemService: MediaItemService, private shareItemService: ShareItemService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMediaItemDto: CreateMediaItemDto) {
    return this.mediaItemService.create(createMediaItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.mediaItemService.findAll();
  }

  @Get('categories')
  getCategories() {
    return MEDIA_CATEGORY;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (typeof id !== 'string') throw badRequestResponse(`${id} must be of type string`);

    const mediaItem = await this.mediaItemService.findOne(id);

    if (!mediaItem) throw notFoundResponse('mediaItem', { args: { id } });
    return mediaItem;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMediaItemDto: UpdateMediaItemDto) {
    return this.mediaItemService.update(id, updateMediaItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.mediaItemService.remove(id);

    if (!deleted) throw notFoundResponse(id);

    return deleted;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/share/:userId')
  async share(@Param('id') id: string, @Param('userId') userId: string, @Res() response: Response) {
    const mediaItem = await this.mediaItemService.findOne(id);
    if (!mediaItem) return response.status(HttpStatus.NOT_FOUND);

    const { userId: createdById, title } = mediaItem as any;

    const shareItem = await this.shareItemService.createMediaShareItem({
      createdBy: createdById,
      userId,
      mediaId: id,
      title,
    });

    return response.status(HttpStatus.CREATED).send(shareItem);
  }
}
