import { Controller, Body, Param, UseGuards, Query, Get, Post, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ObjectIdGuard } from '@mediashare/core/guards';
import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { ObjectIdPipe } from '@mediashare/shared';
import { MEDIA_VISIBILITY } from '../../core/models';
import { RouteTokens } from '../../core/constants';
import { CreateDto } from '../../core/decorators/create-dto.decorator';
import { GetUser } from '@mediashare/core/decorators/user.decorator';
import { MediaGetResponse, MediaPostResponse, MediaPutResponse, MediaShareResponse } from './media-item.decorator';
import { notFoundResponse } from '@mediashare/core/functors/http-errors.functor';
import { MediaItemService } from './media-item.service';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { UpdateMediaItemDto } from './dto/update-media-item.dto';
import { MediaItem } from './entities/media-item.entity';
import { ShareItemService } from '../share-item/share-item.service';
import { ShareItem } from '../share-item/entities/share-item.entity';

@ApiTags('media-items')
@Controller('media-items')
export class MediaItemController {
  constructor(private readonly mediaItemService: MediaItemService, private shareItemService: ShareItemService) {}

  @Get('visibilities')
  getVisibilities() {
    return MEDIA_VISIBILITY;
  }

  @Get(RouteTokens.mediaId)
  @ApiParam({ name: RouteTokens.mediaId, type: String, required: true })
  @MediaGetResponse()
  async findOne(@Param(RouteTokens.mediaId, new ObjectIdPipe()) mediaId: ObjectId) {
    const response = await this.mediaItemService.getById(mediaId);
    if (!response) throw notFoundResponse('mediaItem', { args: { mediaId } });
    return response;
  }

  @Get()
  @ApiQuery({ name: 'text', required: false, allowEmptyValue: true })
  @ApiQuery({ name: 'tags', type: String, explode: true, isArray: true, required: false, allowEmptyValue: true })
  @MediaGetResponse({ isArray: true })
  async findAll(@GetUser('_id') userId: string, @Query('text') query?: string, @Query('tags') tags?: string[]) {
    const parsedTags = Array.isArray(tags) ? tags : typeof tags === 'string' ? [tags] : undefined;
    // Always search, we want to run the aggregate query in every case
    return query || tags ? await this.mediaItemService.search({ userId, query, tags: parsedTags }) : await this.mediaItemService.getByUserId(userId);
  }

  @Get('popular')
  @MediaGetResponse({ isArray: true })
  async findPopular() {
    return await this.mediaItemService.getPopular();
  }

  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @MediaPostResponse()
  async create(@CreateDto() createMediaItemDto: CreateMediaItemDto, @GetUser('_id') createdBy: ObjectId) {
    const mediaItem: Omit<MediaItem, '_id'> = {
      isPlayable: false,
      uri: '',
      ...createMediaItemDto,
      userId: ObjectIdGuard(createdBy),
      createdBy: ObjectIdGuard(createdBy),
    } as any;
    return await this.mediaItemService.create({ ...mediaItem } as any);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(RouteTokens.mediaId)
  @ApiParam({ name: RouteTokens.mediaId, type: String, required: true })
  @MediaPutResponse()
  async update(@Param(RouteTokens.mediaId, ObjectIdPipe) mediaId: ObjectId, @Body() updateMediaItemDto: UpdateMediaItemDto) {
    return await this.mediaItemService.update(mediaId, updateMediaItemDto);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(RouteTokens.mediaId)
  @ApiParam({ name: RouteTokens.mediaId, type: String, required: true })
  async remove(@Param(RouteTokens.mediaId) mediaId: string) {
    const deleted = await this.mediaItemService.remove(mediaId);
    if (!deleted) throw notFoundResponse(mediaId);
    return deleted;
  }

  @Post(`${RouteTokens.mediaId}/share/${RouteTokens.userId}`)
  @ApiParam({ name: RouteTokens.mediaId, type: String, required: true })
  @ApiParam({ name: RouteTokens.userId, type: String, required: true })
  @MediaShareResponse({ type: ShareItem })
  async share(
    @Param(RouteTokens.mediaId) mediaId: string,
    @Param(RouteTokens.userId) userId: string,
    @GetUser('_id') createdBy: string,
    @Res() response: Response
  ) {
    const { title } = await this.mediaItemService.findOne(mediaId);
    if (!title && !createdBy) return response.status(HttpStatus.NOT_FOUND);

    const shareItem = await this.shareItemService.createMediaShareItem({
      createdBy,
      userId,
      mediaId,
    });
    response.status(HttpStatus.CREATED);
    return response.send(shareItem);
  }
}
