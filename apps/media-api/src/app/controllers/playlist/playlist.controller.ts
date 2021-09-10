import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistService } from './services/playlist.service';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { PLAYLIST_CATEGORY } from '@core-lib';
import { GetUserId } from '../../core/decorators/user.decorator';
import { PlaylistGetResponse, PlaylistPostResponse, PlaylistPutResponse } from './playlist.decorator';

import { ObjectIdPipe } from '@mediashare/shared';
import { ShareItem } from '../../modules/share-item/entities/share-item.entity';
import { PlaylistItemResponseDto, PlaylistResponseDto } from './dto/playlist-response.dto';
import { CreatePlaylistResponseDto } from './dto/create-playlist-response.dto';
import { CreateDto } from '../../core/decorators/create-dto.decorator';

const PLAYLIST_ID_TOKEN = ':playlistId';
@ApiTags('playlists')
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService, private shareItemService: ShareItemService) {}

  @Post()
  @PlaylistPostResponse({ type: CreatePlaylistResponseDto })
  @ApiBody({ type: CreatePlaylistDto })
  async create(@CreateDto() createPlaylistDto: CreatePlaylistDto, @GetUserId() getUserId: ObjectId) {
    console.log('dto', createPlaylistDto);
    const { mediaIds } = createPlaylistDto;
    return await this.playlistService.createPlaylistWithItems({
      ...createPlaylistDto,
      userId: getUserId,
      mediaIds: mediaIds.map((id) => new ObjectId(id))
    });
  }

  @Get()
  @PlaylistGetResponse({ isArray: true, type: PlaylistItemResponseDto })
  findAll() {
    return this.playlistService.findAll();
  }

  @Get('categories')
  getCategories() {
    return { categories: PLAYLIST_CATEGORY };
  }

  @Get(':playlistId')
  @ApiParam({
    name: 'playlistId',
    required: true,
    type: 'string',
    example: new ObjectId().toHexString()
  })
  @ApiParam({ name: 'playlistId', type: String, required: true })
  @PlaylistGetResponse({ type: PlaylistResponseDto })
  async findOne(@Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId) {
    const response = await this.playlistService.getPlaylistById({ playlistId });

    return response;
  }

  @Put(':playlistId')
  @ApiParam({ name: 'playlistId', type: 'string', required: true })
  @PlaylistPutResponse()
  async update(@Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId, @GetUserId() userId: ObjectId, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    const { mediaIds, ...rest } = updatePlaylistDto;

    const result = await this.playlistService.update(playlistId, {
      ...rest,
      mediaIds: mediaIds.length > 0 ? mediaIds.map((id) => new ObjectId(id)) : []
    });

    return result;
  }

  @Delete(PLAYLIST_ID_TOKEN)
  @ApiParam({ name: 'playlistId', type: String, required: true })
  remove(@Param('playlistId') playlistId: string) {
    return this.playlistService.remove(playlistId);
  }

  @Post(':playlistId/share/:userId')
  @PlaylistPostResponse({ type: ShareItem, isArray: true })
  @ApiParam({ name: 'playlistId', type: String, required: true })
  @ApiParam({ name: 'userId', type: String, required: true })
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
