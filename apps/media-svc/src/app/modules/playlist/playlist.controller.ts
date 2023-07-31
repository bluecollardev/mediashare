import { Controller, Body, Param, UseGuards, Query, Get, Post, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ObjectIdGuard } from '@mediashare/core/guards';
import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { ObjectIdPipe } from '@mediashare/shared';
import { RouteTokens } from '../../core/constants';
import { PLAYLIST_VISIBILITY } from '../../core/models';
import { CreateDto } from '../../core/decorators/create-dto.decorator';
import { GetUser } from '@mediashare/core/decorators/user.decorator';
import { PlaylistGetResponse, PlaylistPostResponse, PlaylistPutResponse, PlaylistShareResponse } from './playlist.decorator';
import { notFoundResponse } from '@mediashare/core/functors/http-errors.functor';
import { PlaylistService } from './playlist.service';
import { PlaylistResponseDto } from './dto/playlist-response.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { CreatePlaylistResponseDto } from './dto/create-playlist-response.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { ShareItemService } from '../share-item/share-item.service';
import { ShareItem } from '../share-item/entities/share-item.entity';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService, private shareItemService: ShareItemService) {}

  @Get('visibilities')
  getVisibilities() {
    return { visibilities: PLAYLIST_VISIBILITY };
  }

  @Get(RouteTokens.playlistId)
  // @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: RouteTokens.playlistId, type: String, required: true, example: new ObjectId().toHexString() })
  @PlaylistGetResponse()
  async findOne(@Param(RouteTokens.playlistId, new ObjectIdPipe()) playlistId: ObjectId) {
    const response = await this.playlistService.getById(playlistId);
    if (!response) throw notFoundResponse('playlist', { args: { playlistId } });
    return response;
  }

  @Get()
  // @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'text', required: false, allowEmptyValue: true })
  @ApiQuery({ name: 'tags', type: String, explode: true, isArray: true, required: false, allowEmptyValue: true })
  @PlaylistGetResponse({ type: PlaylistResponseDto, isArray: true })
  async findAll(@GetUser('_id') userId: string, @Query('text') query?: string, @Query('tags') tags?: string[]) {
    const parsedTags = Array.isArray(tags) ? tags : typeof tags === 'string' ? [tags] : undefined;
    return !!(query || tags) ? await this.playlistService.search({ userId, query, tags: parsedTags }) : await this.playlistService.getByUserId(userId);
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @PlaylistPostResponse({ type: CreatePlaylistResponseDto })
  async create(@CreateDto() createPlaylistDto: CreatePlaylistDto, @GetUser('_id') userId: string) {
    return await this.playlistService.createPlaylistWithItems({
      ...createPlaylistDto,
      createdBy: ObjectIdGuard(userId),
      cloneOf: createPlaylistDto?.cloneOf ? createPlaylistDto.cloneOf : undefined,
    });
  }

  @Put(RouteTokens.playlistId)
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: RouteTokens.playlistId, type: String, required: true, example: new ObjectId().toHexString() })
  @ApiBody({ type: UpdatePlaylistDto })
  @PlaylistPutResponse()
  async update(@Param(RouteTokens.playlistId) playlistId: string, @GetUser('_id') userId: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistService.updatePlaylistWithItems(playlistId, updatePlaylistDto);
  }

  @Delete(RouteTokens.playlistId)
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: RouteTokens.playlistId, type: String, required: true, example: new ObjectId().toHexString() })
  async remove(@Param(RouteTokens.playlistId) playlistId: string) {
    return await this.playlistService.removePlaylistWithItems(playlistId);
  }

  @Post(`${RouteTokens.playlistId}/share/${RouteTokens.userId}`)
  @ApiParam({ name: RouteTokens.playlistId, type: String, required: true })
  @ApiParam({ name: 'userId', type: String, required: true })
  @PlaylistShareResponse({ type: ShareItem, isArray: true })
  async share(
    @Param(RouteTokens.playlistId, new ObjectIdPipe()) playlistId: ObjectId,
    @Param('userId', new ObjectIdPipe()) userId: ObjectId,
    @GetUser('_id') createdBy: string,
    @Res() response: Response
  ) {
    const shareItem = await this.shareItemService.createPlaylistShareItem({ createdBy: ObjectIdGuard(createdBy), userId, playlistId, title: '' });
    return response.status(HttpStatus.CREATED).send(shareItem);
  }
}
