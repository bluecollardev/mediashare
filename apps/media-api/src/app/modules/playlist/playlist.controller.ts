import { Controller, Body, Param, UseGuards, Query, Get, Post, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ObjectIdGuard } from '@util-lib';
import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { ObjectIdPipe } from '@mediashare/shared';
import RouteTokens from '@api-modules/app-config/constants/open-api.constants';
import { PLAYLIST_CATEGORY } from '@core-lib';
import { CreateDto } from '@api-core/decorators/create-dto.decorator';
import { GetUserId } from '@api-core/decorators/user.decorator';
import { UserService } from '@api-modules/user/user.service';
import { UserGuard } from '@api-modules/user/user.guard';
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
  constructor(private userService: UserService, private readonly playlistService: PlaylistService, private shareItemService: ShareItemService) {}

  @Get('categories')
  getCategories() {
    return { categories: PLAYLIST_CATEGORY };
  }

  @Get(RouteTokens.PLAYLIST_ID)
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'playlistId', type: String, required: true, example: new ObjectId().toHexString() })
  @PlaylistGetResponse()
  async findOne(@Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId) {
    const response = await this.playlistService.getById(playlistId);
    if (!response) throw notFoundResponse('playlist', { args: { playlistId } });
    return response;
  }

  @Get()
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'text', required: false, allowEmptyValue: true })
  @ApiQuery({ name: 'tags', type: String, explode: true, isArray: true, required: false, allowEmptyValue: true })
  @PlaylistGetResponse({ type: PlaylistResponseDto, isArray: true })
  async findAll(@GetUserId() userId: string, @Query('text') query?: string, @Query('tags') tags?: string[]) {
    const parsedTags = Array.isArray(tags) ? tags : typeof tags === 'string' ? [tags] : undefined;
    return query || tags ? await this.playlistService.search({ userId, query, tags: parsedTags }) : await this.playlistService.getByUserId(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @PlaylistPostResponse({ type: CreatePlaylistResponseDto })
  async create(@CreateDto() createPlaylistDto: CreatePlaylistDto, @GetUserId() userId: string) {
    return await this.playlistService.createPlaylistWithItems({ ...createPlaylistDto, createdBy: ObjectIdGuard(userId), cloneOf: createPlaylistDto?.cloneOf ? createPlaylistDto.cloneOf : undefined });
  }

  @Put(RouteTokens.PLAYLIST_ID)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'playlistId', type: String, required: true, example: new ObjectId().toHexString() })
  @ApiBody({ type: UpdatePlaylistDto })
  @PlaylistPutResponse()
  async update(@Param('playlistId') playlistId: string, @GetUserId() userId: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistService.updatePlaylistWithItems(playlistId, updatePlaylistDto);
  }

  @Delete(RouteTokens.PLAYLIST_ID)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'playlistId', type: String, required: true, example: new ObjectId().toHexString() })
  async remove(@Param('playlistId') playlistId: string) {
    return await this.playlistService.removePlaylistWithItems(playlistId);
  }

  @Post(`${RouteTokens.PLAYLIST_ID}/share/${RouteTokens.USER_ID}`)
  @ApiParam({ name: 'playlistId', type: String, required: true })
  @ApiParam({ name: 'userId', type: String, required: true })
  @PlaylistShareResponse({ type: ShareItem, isArray: true })
  async share(
    @Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId,
    @Param('userId', new ObjectIdPipe()) userId: ObjectId,
    @GetUserId() createdBy: string,
    @Res() response: Response
  ) {
    const shareItem = await this.shareItemService.createPlaylistShareItem({ createdBy: ObjectIdGuard(createdBy), userId, playlistId, title: '' });
    return response.status(HttpStatus.CREATED).send(shareItem);
  }
}
