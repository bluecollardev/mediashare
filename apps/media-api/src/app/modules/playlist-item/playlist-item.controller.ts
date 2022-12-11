import { Controller, Body, Param, UseGuards, Query, Get, Post, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ObjectIdGuard } from '@util-lib';
import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { ObjectIdPipe } from '@mediashare/shared';
import RouteTokens from '@api-modules/app-config/constants/open-api.constants';
import { MEDIA_CATEGORY } from '@core-lib';
import { CreateDto } from '@api-core/decorators/create-dto.decorator';
import { GetUserId } from '@api-core/decorators/user.decorator';
import { JwtAuthGuard } from '@api-modules/auth/guards/jwt-auth.guard';
import { PlaylistItemGetResponse, PlaylistItemPostResponse, PlaylistItemPutResponse, PlaylistItemShareResponse } from './playlist-item.decorator';
import { notFoundResponse } from '@api-core/functors/http-errors.functor';
import { PlaylistItemService } from './playlist-item.service';
import { CreatePlaylistItemDto } from './dto/create-playlist-item.dto';
import { UpdatePlaylistItemDto } from './dto/update-playlist-item.dto';
import { PlaylistItem } from './entities/playlist-item.entity';
import { ShareItemService } from '@api-modules/share-item/share-item.service';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';
import { MediaItemService } from '@api-modules/media-item/media-item.service';
import { MediaItem } from '@api-modules/media-item/entities/media-item.entity';

@ApiTags('playlist-items')
@Controller('playlist-items')
export class PlaylistItemController {
  constructor(
    private readonly playlistItemService: PlaylistItemService,
    private mediaItemService: MediaItemService,
    private shareItemService: ShareItemService
  ) {}

  @Get('categories')
  getCategories() {
    return MEDIA_CATEGORY;
  }

  @Get(RouteTokens.PLAYLIST_ITEM_ID)
  @ApiParam({ name: 'playlistItemId', type: String, required: true })
  @PlaylistItemGetResponse()
  async findOne(@Param('playlistItemId') playlistItemId: string) {
    const response = await this.playlistItemService.getById(playlistItemId);
    if (!response) throw notFoundResponse('playlistItem', { args: { playlistItemId } });
    return response;
  }

  @Get()
  @ApiQuery({ name: 'text', required: false, allowEmptyValue: true })
  @ApiQuery({ name: 'tags', type: String, explode: true, isArray: true, required: false, allowEmptyValue: true })
  @PlaylistItemGetResponse({ isArray: true })
  async findAll(@Query('text') query?: string, @Query('tags') tags?: string[]) {
    const parsedTags = Array.isArray(tags) ? tags : typeof tags === 'string' ? [tags] : undefined;
    // Always search, we want to run the aggregate query in every case
    return query || tags ? await this.playlistItemService.search({ query, tags: parsedTags }) : await this.playlistItemService.search({});
  }

  @Get('popular')
  @PlaylistItemGetResponse({ isArray: true })
  async findPopular() {
    return await this.playlistItemService.getPopular();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @PlaylistItemPostResponse()
  async create(@CreateDto() createPlaylistItemDto: CreatePlaylistItemDto, @GetUserId() createdBy) {
    const playlistId = new ObjectId(createPlaylistItemDto?.playlistId);
    const mediaId = new ObjectId(createPlaylistItemDto?.mediaId);
    const sortIndex = createPlaylistItemDto?.sortIndex;
    const mediaItem: MediaItem = await this.mediaItemService.findOne(mediaId);
    delete mediaItem._id;
    const playlistItem: Omit<PlaylistItem, '_id'> = {
      isPlayable: false,
      uri: '',
      ...mediaItem,
      createdBy: ObjectIdGuard(createdBy),
      userId: ObjectIdGuard(createdBy),
      playlistId: ObjectIdGuard(playlistId),
      mediaId: ObjectIdGuard(mediaId),
      sortIndex,
    };
    return await this.playlistItemService.create({ ...playlistItem });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(RouteTokens.PLAYLIST_ITEM_ID)
  @ApiParam({ name: 'playlistItemId', type: String, required: true })
  @PlaylistItemPutResponse()
  async update(@Param('playlistItemId', ObjectIdPipe) playlistItemId: ObjectId, @Body() updatePlaylistItemDto: UpdatePlaylistItemDto) {
    return await this.playlistItemService.update(playlistItemId, updatePlaylistItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(RouteTokens.PLAYLIST_ITEM_ID)
  @ApiParam({ name: 'playlistItemId', type: String, required: true })
  async remove(@Param('playlistItemId') playlistItemId: string) {
    const deleted = await this.playlistItemService.remove(playlistItemId);
    if (!deleted) throw notFoundResponse(playlistItemId);
    return deleted;
  }

  @Post(`${RouteTokens.PLAYLIST_ITEM_ID}/share/${RouteTokens.USER_ID}`)
  @ApiParam({ name: 'playlistItemId', type: String, required: true })
  @ApiParam({ name: 'userId', type: String, required: true })
  @PlaylistItemShareResponse({ type: ShareItem })
  async share(
    @Param('playlistItemId', new ObjectIdPipe()) playlistItemId: ObjectId,
    @Param('userId', new ObjectIdPipe()) userId: ObjectId,
    @GetUserId() createdBy: ObjectId,
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
