import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { Response } from 'express';

import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistService } from './playlist.service';
import { ShareItemService } from '@api-modules/share-item/share-item.service';
import { PLAYLIST_CATEGORY } from '@core-lib';
import { GetUserId } from '@api-core/decorators/user.decorator';
import { PlaylistGetResponse, PlaylistPostResponse, PlaylistPutResponse } from './playlist.decorator';

import { ObjectIdPipe } from '@mediashare/shared';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';
import { PlaylistItemResponseDto, PlaylistResponseDto } from './dto/playlist-response.dto';
import { CreatePlaylistResponseDto } from './dto/create-playlist-response.dto';
import { CreateDto } from '@api-core/decorators/create-dto.decorator';
import { JwtAuthGuard } from '@api-modules/auth/guards/jwt-auth.guard';

const PLAYLIST_ID_TOKEN = ':playlistId';
@ApiTags('playlists')
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService, private shareItemService: ShareItemService) {}

  @Get()
  @ApiQuery({ name: 'text', required: false, allowEmptyValue: true })
  @ApiQuery({ name: 'tags', type: String, explode: true, isArray: true, required: false, allowEmptyValue: true })
  @PlaylistGetResponse({ isArray: true, type: PlaylistItemResponseDto })
  findAll(@Query('text') query?: string, @Query('tags') tags?: string[]) {
    const parsedTags = Array.isArray(tags) ? tags : typeof tags === 'string' ? [tags] : undefined;

    return query || tags ? this.playlistService.searchPlaylists({ query, tags: parsedTags }) : this.playlistService.findAll();
  }

  @Get('categories')
  getCategories() {
    return { categories: PLAYLIST_CATEGORY };
  }

  @Get(':playlistId')
  @ApiParam({ name: 'playlistId', type: String, required: true, example: new ObjectId().toHexString() })
  @PlaylistGetResponse()
  async findOne(@Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId) {
    return await this.playlistService.getPlaylistById({ playlistId });
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
  @Put(':playlistId')
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

  @Delete(PLAYLIST_ID_TOKEN)
  @ApiParam({ name: 'playlistId', type: String, required: true, example: new ObjectId().toHexString() })
  remove(@Param('playlistId') playlistId: string) {
    return this.playlistService.remove(playlistId);
  }

  @Post(':playlistId/share/:userId')
  @ApiParam({ name: 'playlistId', type: String, required: true })
  @ApiParam({ name: 'userId', type: String, required: true })
  @PlaylistPostResponse({ type: ShareItem, isArray: true })
  async share(
    @Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId,
    @Param('userId', new ObjectIdPipe()) userId: ObjectId,
    @GetUserId() createdBy: ObjectId,
    @Res() response: Response
  ) {
    const shareItem = await this.shareItemService.createPlaylistShareItem({ createdBy, userId, playlistId });
    return response.status(HttpStatus.CREATED).send(shareItem);
  }
}
