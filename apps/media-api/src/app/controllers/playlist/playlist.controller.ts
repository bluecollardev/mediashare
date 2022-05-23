import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ObjectId } from 'mongodb';
import { ObjectIdPipe } from '@mediashare/shared';
import RouteTokens from '@api-modules/app-config/constants/open-api.constants';
import { PLAYLIST_CATEGORY } from '@core-lib';
import { CreateDto } from '@api-core/decorators/create-dto.decorator';
import { GetUserId } from '@api-core/decorators/user.decorator';
import { JwtAuthGuard } from '@api-modules/auth/guards/jwt-auth.guard';

import { PlaylistGetResponse, PlaylistPostResponse, PlaylistPutResponse, PlaylistShareResponse } from './playlist.decorator';
import { notFoundResponse } from '@api-core/functors/http-errors.functor';
import { PlaylistService } from './playlist.service';
import { PlaylistResponseDto } from './dto/playlist-response.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { CreatePlaylistResponseDto } from './dto/create-playlist-response.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { ShareItemService } from '@api-modules/share-item/share-item.service';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService, private shareItemService: ShareItemService) {}

  @Get('categories')
  getCategories() {
    return { categories: PLAYLIST_CATEGORY };
  }

  @Get(RouteTokens.PLAYLIST_ID)
  @ApiParam({ name: 'playlistId', type: String, required: true, example: new ObjectId().toHexString() })
  @PlaylistGetResponse()
  async findOne(@Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId) {
    const response = await this.playlistService.getById(playlistId);
    if (!response) throw notFoundResponse('playlist', { args: { playlistId } });
    return response;
  }

  @Get()
  @ApiQuery({ name: 'text', required: false, allowEmptyValue: true })
  @ApiQuery({ name: 'tags', type: String, explode: true, isArray: true, required: false, allowEmptyValue: true })
  @PlaylistGetResponse({ type: PlaylistResponseDto, isArray: true })
  async findAll(@Query('text') query?: string, @Query('tags') tags?: string[]) {
    const parsedTags = Array.isArray(tags) ? tags : typeof tags === 'string' ? [tags] : undefined;
    return query || tags ? await this.playlistService.search({ query, tags: parsedTags }) : await this.playlistService.findAll();
  }

  @Get('popular')
  @PlaylistGetResponse({ isArray: true })
  async findPopular() {
    return await this.playlistService.getPopular();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @PlaylistPostResponse({ type: CreatePlaylistResponseDto })
  async create(@CreateDto() createPlaylistDto: CreatePlaylistDto, @GetUserId() getUserId: ObjectId) {
    const { mediaIds } = createPlaylistDto;
    return await this.playlistService.createPlaylistWithItems({
      ...createPlaylistDto,
      createdBy: getUserId,
      mediaIds,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(RouteTokens.PLAYLIST_ID)
  @ApiParam({ name: 'playlistId', type: String, required: true, example: new ObjectId().toHexString() })
  @ApiBody({ type: UpdatePlaylistDto })
  @PlaylistPutResponse()
  async update(@Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId, @GetUserId() userId: ObjectId, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    const { mediaIds, ...rest } = updatePlaylistDto;
    return await this.playlistService.update(playlistId, {
      ...rest,
      mediaIds: mediaIds.length > 0 ? mediaIds.map((id) => new ObjectId(id)) : [],
    });
  }

  @Delete(RouteTokens.PLAYLIST_ID)
  @ApiParam({ name: 'playlistId', type: String, required: true, example: new ObjectId().toHexString() })
  async remove(@Param('playlistId') playlistId: string) {
    return await this.playlistService.remove(playlistId);
  }

  @Post(`${RouteTokens.PLAYLIST_ID}/share/${RouteTokens.USER_ID}`)
  @ApiParam({ name: 'playlistId', type: String, required: true })
  @ApiParam({ name: 'userId', type: String, required: true })
  @PlaylistShareResponse({ type: ShareItem, isArray: true })
  async share(
    @Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId,
    @Param('userId', new ObjectIdPipe()) userId: ObjectId,
    @GetUserId() createdBy: ObjectId,
    @Res() response: Response
  ) {
    const shareItem = await this.shareItemService.createPlaylistShareItem({ createdBy, userId, playlistId, title: '' });
    return response.status(HttpStatus.CREATED).send(shareItem);
  }
}
