import { AuthenticationGuard } from '@nestjs-cognito/auth';
import { Controller, Body, Param, Query, Get, Post, Put, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RouteTokens } from '../../core/constants';
import { MEDIA_VISIBILITY } from '../../core/models';
import { GetUser } from '@mediashare/core/decorators/user.decorator';
import { UserGuard } from '../../core/guards';
import { PlaylistItemGetResponse, PlaylistItemPostResponse, PlaylistItemPutResponse, PlaylistItemShareResponse } from './playlist-item.decorator';
import { notFoundResponse } from '@mediashare/core/functors/http-errors.functor';
import { PlaylistItemService } from './playlist-item.service';
import { CreatePlaylistItemDto } from './dto/create-playlist-item.dto';
import { UpdatePlaylistItemDto } from './dto/update-playlist-item.dto';
import { PlaylistItem } from './entities/playlist-item.entity';
import { ShareItemService } from '../share-item/share-item.service';
import { ShareItem } from '../share-item/entities/share-item.entity';
import { MediaItemService } from '../media-item/media-item.service';

@ApiTags('playlist-items')
@Controller('playlist-items')
export class PlaylistItemController {
  constructor(
    private readonly playlistItemService: PlaylistItemService,
    private mediaItemService: MediaItemService,
    private shareItemService: ShareItemService
  ) {}

  @Get('visibilities')
  getVisibilities() {
    return MEDIA_VISIBILITY;
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'playlistItemId', type: String, required: true })
  @Get(RouteTokens.playlistItemId)
  @PlaylistItemGetResponse()
  async findOne(@Param('playlistItemId') playlistItemId: string) {
    const response = await this.playlistItemService.getById(playlistItemId);
    if (!response) throw notFoundResponse('playlistItem', { args: { playlistItemId } });
    return response;
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'text', required: false, allowEmptyValue: true })
  @ApiQuery({ name: 'tags', type: String, explode: true, isArray: true, required: false, allowEmptyValue: true })
  @Get()
  @PlaylistItemGetResponse({ isArray: true })
  async findAll(@Query('text') query?: string, @Query('tags') tags?: string[]) {
    const parsedTags = Array.isArray(tags) ? tags : typeof tags === 'string' ? [tags] : undefined;
    // Always search, we want to run the aggregate query in every case
    return query || tags ? await this.playlistItemService.search({ query, tags: parsedTags }) : await this.playlistItemService.search({});
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @Get('popular')
  @PlaylistItemGetResponse({ isArray: true })
  async findPopular() {
    return await this.playlistItemService.getPopular();
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @Post()
  @PlaylistItemPostResponse()
  async create(@Body() createPlaylistItemDto: CreatePlaylistItemDto, @GetUser('_id') createdBy) {
    const playlistId = createPlaylistItemDto?.playlistId;
    const mediaId = createPlaylistItemDto?.mediaId;
    const sortIndex = createPlaylistItemDto?.sortIndex;
    const mediaItem = await this.mediaItemService.findOne(mediaId);
    delete mediaItem._id;
    const playlistItem: Omit<PlaylistItem, '_id'> = {
      isPlayable: false,
      uri: '',
      ...mediaItem,
      createdBy,
      userId: createdBy,
      playlistId: playlistId,
      mediaId: mediaId,
      sortIndex,
    } as any;
    return await this.playlistItemService.create({ ...playlistItem } as any);
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'playlistItemId', type: String, required: true })
  @Put(RouteTokens.playlistItemId)
  @PlaylistItemPutResponse()
  async update(@Param('playlistItemId') playlistItemId: string, @Body() updatePlaylistItemDto: UpdatePlaylistItemDto) {
    return await this.playlistItemService.update(playlistItemId, updatePlaylistItemDto);
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'playlistItemId', type: String, required: true })
  @Delete(RouteTokens.playlistItemId)
  async remove(@Param('playlistItemId') playlistItemId: string) {
    const deleted = await this.playlistItemService.remove(playlistItemId);
    if (!deleted) throw notFoundResponse(playlistItemId);
    return deleted;
  }

  @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'playlistItemId', type: String, required: true })
  @ApiParam({ name: 'userId', type: String, required: true })
  @Post(`${RouteTokens.playlistItemId}/share/${RouteTokens.userId}`)
  @PlaylistItemShareResponse({ type: ShareItem })
  async share(
    @Param('playlistItemId') playlistItemId: string,
    @Param(RouteTokens.userId) userId: string,
    @GetUser('_id') createdBy: string,
    @Res() response: Response
  ) {
    const { title } = await this.playlistItemService.findOne(playlistItemId);
    if (!title && !createdBy) return response.status(HttpStatus.NOT_FOUND);

    // TODO: Fix this!
    /* const shareItem = await this.shareItemService.createMediaShareItem({
      createdBy,
      userId,
      playlistItemId,
      title,
    });
    response.status(HttpStatus.CREATED);
    return response.sendEmail(shareItem); */
  }
}
