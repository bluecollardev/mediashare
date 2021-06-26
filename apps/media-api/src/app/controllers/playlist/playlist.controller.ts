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
import { PlaylistGetResponse, PlaylistPostResponse } from './playlist.decorator';
import { UseJwtGuard } from '../../modules/auth/auth.decorator';
import { ObjectIdPipe } from '@mediashare/shared';
import { ShareItem } from '../../modules/share-item/entities/share-item.entity';
import { PlaylistResponseDto } from './dto/playlist-response.dto';
import { CreatePlaylistResponseDto } from './dto/create-playlist-response.dto';
import { CreateDto } from '../../core/decorators/create-dto.decorator';
import { PlaylistItem } from '../../modules/playlist-item/entities/playlist-item.entity';

const PLAYLIST_ID_TOKEN = ':playlistId';
@ApiTags('playlists')
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService, private shareItemService: ShareItemService) {}

  @PlaylistPostResponse({ type: CreatePlaylistResponseDto })
  @Post()
  @ApiBody({ type: CreatePlaylistDto })
  async create(@CreateDto() createPlaylistDto: CreatePlaylistDto, @GetUserId() userId: ObjectId) {
    console.log('dto', createPlaylistDto);
    return await this.playlistService.createPlaylistWithItems({ ...createPlaylistDto, userId });
  }

  @PlaylistGetResponse({ isArray: true, type: PlaylistItem })
  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get('categories')
  getCategories() {
    return { categories: PLAYLIST_CATEGORY };
  }

  @PlaylistGetResponse({ type: PlaylistResponseDto })
  @ApiParam({
    name: 'playlistId',
    required: true,
    type: 'string',
    example: new ObjectId().toHexString(),
  })
  @Get(PLAYLIST_ID_TOKEN)
  @ApiParam({ name: 'playlistId', type: String, required: true })
  findOne(@Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId) {
    return this.playlistService.getPlaylistById({ playlistId });
  }

  @Put(PLAYLIST_ID_TOKEN)
  @ApiParam({ name: 'playlistId', type: String, required: true })
  update(@Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId, @GetUserId() userId: ObjectId, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    const { ...rest } = updatePlaylistDto;
    return this.playlistService.update(playlistId, { ...rest, userId });
  }

  @Delete(PLAYLIST_ID_TOKEN)
  // @UseJwtGuard()
  @ApiParam({ name: 'playlistId', type: String, required: true })
  remove(@Param('playlistId') playlistId: string) {
    return this.playlistService.remove(playlistId);
  }

  @Post([':playlistId', ' share', ':userId'])
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
