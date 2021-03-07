import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { MediaItemService } from './media-item.service';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { UpdateMediaItemDto } from './dto/update-media-item.dto';

import { notFoundResponse } from '../../core/functors/http-errors.functor';

import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { MEDIA_CATEGORY } from '@core-lib';
import { ObjectId } from 'mongodb';
import { MediaGetResponse, MediaPostResponse } from './media-item.decorator';
import { ObjectIdPipe } from '@mediashare/shared';
import { CreateDto } from '../../core/decorators/create-dto.decorator';

@ApiTags('media-items')
@Controller('media-items')
export class MediaItemController {
  constructor(private readonly mediaItemService: MediaItemService, private shareItemService: ShareItemService) {}

  /**
   * Create a new user

   *
   * @param {CreateMediaItemDto} createMediaItemDto
   * @param {SessionUserInterface} user
   * @return {*}
   * @memberof MediaItemController
   */
  @Post()
  @MediaPostResponse()
  create(@CreateDto() createMediaItemDto: CreateMediaItemDto) {
    return this.mediaItemService.create(createMediaItemDto);
  }

  /* TODO: findout what this needs to be */
  @Get()
  @MediaGetResponse({ isArray: true })
  findAll() {
    return this.mediaItemService.findAll();
  }

  @Get('categories')
  getCategories() {
    return MEDIA_CATEGORY;
  }

  @MediaGetResponse()
  @Get(':id')
  async findOne(@Param('id', new ObjectIdPipe()) id: ObjectId) {
    const mediaItem = await this.mediaItemService.findOne(id);

    if (!mediaItem) throw notFoundResponse('mediaItem', { args: { id } });
    return mediaItem;
  }

  @MediaPostResponse()
  @Put(':id')
  update(@Param('id', ObjectIdPipe) id: ObjectId, @CreateDto() updateMediaItemDto: UpdateMediaItemDto) {
    return this.mediaItemService.update(id, updateMediaItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.mediaItemService.remove(id);

    if (!deleted) throw notFoundResponse(id);

    return deleted;
  }

  @Post(':mediaId/share/:userId')
  @MediaPostResponse()
  async share(
    @Param('mediaId', new ObjectIdPipe()) mediaId: ObjectId,
    @Param('userId', new ObjectIdPipe()) userId: ObjectId,
    @Res() response: Response
  ) {
    console.log('the id', mediaId);
    const { userId: createdBy, title } = await this.mediaItemService.findOne(mediaId);
    if (!title && !createdBy) return response.status(HttpStatus.NOT_FOUND);

    const shareItem = await this.shareItemService.createMediaShareItem({
      createdBy,
      userId,
      mediaId,
      title,
    });
    response.status(HttpStatus.CREATED);

    return response.send(shareItem);
  }
}
