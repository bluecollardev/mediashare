import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';

import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistService } from './services/playlist.service';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { PLAYLIST_CATEGORY } from '@core-lib';
import { SessionUserInterface } from '../../core/models/auth-user.model';
import { GetUser } from '../../core/decorators/user.decorator';
import { PlaylistGetResponse, PlaylistPostResponse } from './playlist.decorator';
import { UseJwtGuard } from '../../modules/auth/auth.decorator';
import { ApiPostResponse, ObjectIdPipe } from '@mediashare/shared';
import { ShareItem } from '../../modules/share-item/entities/share-item.entity';
import { PlaylistResponseDto } from './dto/playlist-response.dto';
import { CreatePlaylistResponseDto } from './dto/create-playlist-response.dto';
import { CreateDto } from '../../core/decorators/create-dto.decorator';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService, private shareItemService: ShareItemService) {}

  @Post()
  @PlaylistPostResponse({ type: CreatePlaylistResponseDto })
  async create(@CreateDto() createPlaylistDto: CreatePlaylistDto, @GetUser() user: SessionUserInterface) {
    const { _id: userId } = user;

    return await this.playlistService.createPlaylistWithItems({ ...createPlaylistDto, userId });
  }

  @Get()
  @PlaylistGetResponse({ isArray: true, type: PlaylistResponseDto })
  findAll() {
    return this.playlistService.findAll();
  }

  @Get('categories')
  getCategories() {
    return { categories: PLAYLIST_CATEGORY };
  }

  @Get('share-playlists')
  @PlaylistGetResponse({ isArray: true, type: ShareItem })
  async getMyShareItems(@GetUser() user: SessionUserInterface = null) {
    const { _id: userId } = user;

    const items = await this.shareItemService.findOne(userId);

    return items ?? [];
  }

  @PlaylistGetResponse({ type: PlaylistResponseDto })
  @Get(':playlistId')
  findOne(@Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId) {
    return this.playlistService.getPlaylistById({ playlistId });
  }

  @Put(':playlistId')
  @PlaylistPostResponse()
  update(
    @Param('playlistId', ObjectIdPipe) playlistId: ObjectId,
    @GetUser() user: SessionUserInterface,
    @Body() updatePlaylistDto: UpdatePlaylistDto
  ) {
    const { ...rest } = updatePlaylistDto;
    const { _id: userId } = user;

    return this.playlistService.update(playlistId, { ...rest, userId: new ObjectId(userId) });
  }

  @UseJwtGuard()
  @Delete(':playlistId')
  remove(@Param('playlistId') id: string) {
    return this.playlistService.remove(id);
  }

  @Post(':playlistId/share/:userId')
  @ApiPostResponse({ type: ShareItem, isArray: true })
  async share(
    @Param('userId', new ObjectIdPipe()) userId: ObjectId,
    @Param('playlistId', new ObjectIdPipe()) playlistId: ObjectId,
    @GetUser() user: SessionUserInterface,
    @Res() response: Response
  ) {
    const { _id: createdBy } = user;
    Logger.log(playlistId);

    const shareItem = await this.shareItemService.createPlaylistShareItem({ createdBy, userId, playlistId });

    return response.status(HttpStatus.CREATED).send(shareItem);
  }
}
