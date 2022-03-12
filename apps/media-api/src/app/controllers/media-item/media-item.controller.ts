import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

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
import RouteTokens from '../../modules/app-config/constants/open-api.constants';
import { GetUserId } from '../../core/decorators/user.decorator';
import { ShareItem } from '../../modules/share-item/entities/share-item.entity';
import { MediaItem } from './entities/media-item.entity';
import { AppConfigService } from '../../modules/app-config/app-config.provider';

@ApiTags('media-items')
@Controller('media-items')
export class MediaItemController {
  constructor(private readonly mediaItemService: MediaItemService, private shareItemService: ShareItemService, private configSvc: AppConfigService) {}

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@CreateDto() createMediaItemDto: CreateMediaItemDto, @GetUserId() createdBy: ObjectId) {
    const mediaItem: Omit<MediaItem, '_id'> = { ...createMediaItemDto, userId: createdBy, createdBy };
    return this.mediaItemService.create({ ...mediaItem });
  }

  /* TODO: findout what this needs to be */
  @Get('popular')
  @Get()
  @MediaGetResponse({ isArray: true })
  findPopularMediaItems() {
    return this.mediaItemService.findPopularMediaItems();
  }

  @Get()
  @MediaGetResponse({ isArray: true })
  @ApiQuery({ name: 'text', required: false, allowEmptyValue: true })
  findAll(@Query('text') query?: string) {
    return query ? this.mediaItemService.searchMediaItems({ query }) : this.mediaItemService.findAll();
  }

  @Get('categories')
  getCategories() {
    return MEDIA_CATEGORY;
  }

  @Get(':mediaId')
  @MediaGetResponse()
  @ApiParam({ name: 'mediaId', type: String, required: true })
  async findOne(@Param('mediaId', new ObjectIdPipe()) mediaId: ObjectId) {
    const mediaItem = await this.mediaItemService.findMediaItemWithDetail(mediaId);
    if (!mediaItem) throw notFoundResponse('mediaItem', { args: { mediaId } });
    return mediaItem;
  }

  @MediaPostResponse()
  @Put(RouteTokens.MEDIA_ITEM_ID)
  @ApiParam({ name: 'mediaId', type: String, required: true })
  @ApiBody({ type: UpdateMediaItemDto })
  update(@Param('mediaId', ObjectIdPipe) mediaId: ObjectId, @Body() updateMediaItemDto: UpdateMediaItemDto) {
    return this.mediaItemService.update(mediaId, updateMediaItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(RouteTokens.MEDIA_ITEM_ID)
  @ApiParam({ name: 'mediaId', type: String, required: true })
  async remove(@Param('mediaId') mediaId: string) {
    const deleted = await this.mediaItemService.remove(mediaId);
    if (!deleted) throw notFoundResponse(mediaId);
    return deleted;
  }

  @Post(':mediaId/share/:userId')
  @MediaPostResponse({ type: ShareItem })
  @ApiParam({ name: 'mediaId', type: String, required: true })
  @ApiParam({ name: 'userId', type: String, required: true })
  async share(
    @Param('mediaId', new ObjectIdPipe()) mediaId: ObjectId,
    @Param('userId', new ObjectIdPipe()) userId: ObjectId,
    @GetUserId() createdBy: ObjectId,
    @Res() response: Response
  ) {
    console.log('the id', mediaId);
    const { title } = await this.mediaItemService.findOne(mediaId);
    if (!title && !createdBy) return response.status(HttpStatus.NOT_FOUND);

    const shareItem = await this.shareItemService.createMediashareItem({
      createdBy,
      userId,
      mediaId,
      title,
    });
    response.status(HttpStatus.CREATED);

    return response.send(shareItem);
  }
}
