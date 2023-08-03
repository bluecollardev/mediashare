import { AuthenticationGuard } from '@nestjs-cognito/auth';
import { Controller, Body, Param, Query, Get, Post, Put, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RouteTokens } from '../../core/constants';
import { PLAYLIST_VISIBILITY } from '../../core/models';
import { GetUser } from '@mediashare/core/decorators/user.decorator';
import { PlaylistGetResponse, PlaylistPostResponse, PlaylistPutResponse, PlaylistShareResponse } from './playlist.decorator';
import { notFoundResponse } from '@mediashare/core/functors/http-errors.functor';
import { PlaylistService } from './playlist.service';
import { PlaylistDto } from './dto/playlist.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
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

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get(RouteTokens.playlistId)
  @ApiParam({ name: RouteTokens.playlistId, type: String, required: true, example: '123' })
  @PlaylistGetResponse()
  async findOne(@Param(RouteTokens.playlistId) playlistId: string) {
    const response = await this.playlistService.getById(playlistId);
    if (!response) throw notFoundResponse('playlist', { args: { playlistId } });
    return response;
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'text', required: false, allowEmptyValue: true })
  @ApiQuery({ name: 'tags', type: String, explode: true, isArray: true, required: false, allowEmptyValue: true })
  @Get()
  @PlaylistGetResponse({ type: PlaylistDto, isArray: true })
  async findAll(@GetUser('_id') userId: string, @Query('text') query?: string, @Query('tags') tags?: string[]) {
    const parsedTags = Array.isArray(tags) ? tags : typeof tags === 'string' ? [tags] : undefined;
    return query || tags ? await this.playlistService.search({ userId, query, tags: parsedTags }) : await this.playlistService.getByUserId(userId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreatePlaylistDto })
  @Post()
  @PlaylistPostResponse({ type: PlaylistDto })
  async create(@Body() createPlaylistDto: CreatePlaylistDto, @GetUser('_id') userId: string) {
    return await this.playlistService.create({
      ...createPlaylistDto,
      createdBy: userId,
      cloneOf: createPlaylistDto?.cloneOf ? createPlaylistDto.cloneOf : undefined,
    });
  }


  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiParam({ name: RouteTokens.playlistId, type: String, required: true, example: '123' })
  @ApiBody({ type: UpdatePlaylistDto })
  @Put(RouteTokens.playlistId)
  @PlaylistPutResponse()
  async update(@Param(RouteTokens.playlistId) playlistId: string, @GetUser('_id') userId: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistService.update(playlistId, updatePlaylistDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Delete(RouteTokens.playlistId)
  @ApiParam({ name: RouteTokens.playlistId, type: String, required: true, example: '123' })
  async remove(@Param(RouteTokens.playlistId) playlistId: string) {
    return await this.playlistService.remove(playlistId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiParam({ name: RouteTokens.playlistId, type: String, required: true })
  @ApiParam({ name: 'userId', type: String, required: true })
  @Post(`${RouteTokens.playlistId}/share/${RouteTokens.userId}`)
  @PlaylistShareResponse({ type: ShareItem, isArray: true })
  async share(
    @Param(RouteTokens.playlistId) playlistId: string,
    @Param(RouteTokens.userId) userId: string,
    @GetUser('_id') createdBy: string,
    @Res() response: Response
  ) {
    const shareItem = await this.shareItemService.createPlaylistShareItem({ userId, playlistId, createdBy });
    return response.status(HttpStatus.CREATED).send(shareItem);
  }
}
