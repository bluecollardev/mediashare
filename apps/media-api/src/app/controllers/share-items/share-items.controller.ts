import { Controller, Get, Param, Delete, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ObjectIdPipe } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import RouteTokens from '@api-modules/app-config/constants/open-api.constants';
import { GetUserId } from '@api-core/decorators/user.decorator';
import { ShareItemService } from '@api-modules/share-item/share-item.service';
import { MediaItemResponseDto } from '../media-item/dto/media-item-response.dto';
import { PlaylistResponseDto } from '../playlist/dto/playlist-response.dto';
import { ShareItemsResponseDto } from './dto/share-items.dto';
import { ShareItemGetResponse } from './share-items.decorator';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';
import { UserGuard } from '@api-modules/user/user.guard';

@ApiTags('share-items')
@Controller('share-items')
export class ShareItemsController {
  constructor(private readonly shareItemService: ShareItemService) {}

  @Get('shared-by-user')
  @ShareItemGetResponse({ type: ShareItemsResponseDto, isArray: true })
  async findItemsSharedByUser(@GetUserId() userId: ObjectId) {
    return await this.shareItemService.getItemsSharedByUser(userId);
  }

  @Get('shared-by-user/media-items')
  @ShareItemGetResponse({ type: MediaItemResponseDto, isArray: true })
  async findMediaItemsSharedByUser(@GetUserId() userId: ObjectId) {
    return await this.shareItemService.getMediaItemsSharedByUser(userId);
  }
  @Get('shared-by-user/playlists')
  @ShareItemGetResponse({ type: PlaylistResponseDto, isArray: true })
  async findPlaylistsSharedByUser(@GetUserId() userId: ObjectId) {
    return await this.shareItemService.getPlaylistsSharedByUser(userId);
  }

  @Get('shared-with-user')
  @ShareItemGetResponse({ type: ShareItemsResponseDto, isArray: true })
  async findItemsSharedWithUser(@GetUserId() userId: ObjectId) {
    return await this.shareItemService.getItemsSharedWithUser(userId);
  }

  @Get('shared-with-user/media-items')
  @ShareItemGetResponse({ type: MediaItemResponseDto, isArray: true })
  async findMediaItemsSharedWithUser(@GetUserId() userId: ObjectId) {
    return await this.shareItemService.getMediaItemsSharedWithUser(userId);
  }
  @Get('shared-with-user/playlists')
  @ShareItemGetResponse({ type: PlaylistResponseDto, isArray: true })
  async findPlaylistsSharedWithUser(@GetUserId() userId: ObjectId) {
    return await this.shareItemService.getPlaylistsSharedWithUser(userId);
  }

  @Get(RouteTokens.SHARE_ID)
  @ApiParam({ name: 'shareId', type: String, required: true })
  @ShareItemGetResponse()
  async findShareItem(@Param('shareId', new ObjectIdPipe()) shareId: ObjectId) {
    return await this.shareItemService.findOne(shareId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @Post(`read/${RouteTokens.SHARE_ID}`) // TODO: Why is this a POST? Shouldn't we be using ShareItemPostResponse as well?
  @ApiParam({ name: 'shareId', type: String, required: true })
  @ApiResponse({ type: ShareItem, status: 200 })
  async readShareItem(@Param('shareId', new ObjectIdPipe()) shareId: ObjectId) {
    return await this.shareItemService.update(shareId, { read: true });
  }

  @Delete(RouteTokens.SHARE_ID)
  @ApiParam({ name: 'shareId', type: String, required: true })
  @ShareItemGetResponse()
  async removeShareItem(@Param('shareId', new ObjectIdPipe()) shareId: ObjectId) {
    return await this.shareItemService.remove(shareId);
  }
}
