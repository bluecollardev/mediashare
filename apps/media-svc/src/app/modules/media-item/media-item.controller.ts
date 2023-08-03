import { AuthenticationGuard } from '@nestjs-cognito/auth';
import { Controller, Body, Param, Query, Get, Post, Put, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MEDIA_VISIBILITY } from '../../core/models';
import { RouteTokens } from '../../core/constants';
import { CreateDto } from '../../core/decorators/create-dto.decorator';
import { GetUser } from '@mediashare/core/decorators/user.decorator';
import { UserGuard } from '../../core/guards';
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

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'mediaId', type: String, required: true })
  @Get(RouteTokens.mediaId)
  @MediaGetResponse()
  async findOne(@Param('mediaId') mediaId: string) {
    const response = await this.mediaItemService.getById(mediaId);
    if (!response) throw notFoundResponse('mediaItem', { args: { mediaId } });
    return response;
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'text', required: false, allowEmptyValue: true })
  @ApiQuery({ name: 'tags', type: String, explode: true, isArray: true, required: false, allowEmptyValue: true })
  @Get()
  @MediaGetResponse({ isArray: true })
  async findAll(@GetUser('_id') userId: string, @Query('text') query?: string, @Query('tags') tags?: string[]) {
    const parsedTags = Array.isArray(tags) ? tags : typeof tags === 'string' ? [tags] : undefined;
    // Always search, we want to run the aggregate query in every case
    return query || tags ? await this.mediaItemService.search({ userId, query, tags: parsedTags }) : await this.mediaItemService.getByUserId(userId);
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @Get('popular')
  @MediaGetResponse({ isArray: true })
  async findPopular() {
    return await this.mediaItemService.getPopular();
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @Post()
  @MediaPostResponse()
  async create(@CreateDto() createMediaItemDto: CreateMediaItemDto, @GetUser('_id') createdBy: string) {
    const mediaItem: Omit<MediaItem, '_id'> = {
      isPlayable: false,
      uri: '',
      ...createMediaItemDto,
      userId: createdBy,
      createdBy: createdBy,
    } as any;
    return await this.mediaItemService.create({ ...mediaItem } as any);
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'mediaId', type: String, required: true })
  @Put(RouteTokens.mediaId)
  @MediaPutResponse()
  async update(@Param('mediaId') mediaId: string, @Body() updateMediaItemDto: UpdateMediaItemDto) {
    return await this.mediaItemService.update(mediaId, updateMediaItemDto);
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'mediaId', type: String, required: true })
  @Delete(RouteTokens.mediaId)
  async remove(@Param('mediaId') mediaId: string) {
    const deleted = await this.mediaItemService.remove(mediaId);
    if (!deleted) throw notFoundResponse(mediaId);
    return deleted;
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'mediaId', type: String, required: true })
  @ApiParam({ name: RouteTokens.userId, type: String, required: true })
  @Post(`${RouteTokens.mediaId}/share/${RouteTokens.userId}`)
  @MediaShareResponse({ type: ShareItem })
  async share(
    @Param('mediaId') mediaId: string,
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
