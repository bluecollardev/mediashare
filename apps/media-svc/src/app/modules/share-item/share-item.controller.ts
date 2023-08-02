import { Controller, Param, HttpCode, UseGuards, HttpStatus, Get, Delete, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { ObjectIdPipe } from '@mediashare/shared';
import { GetUser } from '@mediashare/core/decorators/user.decorator';
import { RouteTokens } from '../../core/constants';
import { ShareItemService } from './share-item.service';
import { ShareItemsByUserIdDto, ShareItemsDto, ShareItemsResponseDto } from './dto/share-item.dto';
import { ShareItemGetResponse } from './share-item.decorator';
import { ShareItem } from './entities/share-item.entity';
import { MediaItemDto } from '../media-item/dto/media-item.dto';
import { PlaylistDto } from '../playlist/dto/playlist.dto';
import { UserGuard } from '@mediashare/core/guards/user.guard';

@ApiTags('share-items')
@Controller('share-items')
export class ShareItemController {
  constructor(private readonly shareItemService: ShareItemService) {}

  @ApiBearerAuth()
  @Get('shared-by-user')
  @ShareItemGetResponse({ type: ShareItemsResponseDto, isArray: true })
  async findItemsSharedByUser(@GetUser('_id') userId: string) {
    return await this.shareItemService.getItemsSharedByUser(userId);
  }

  @ApiBearerAuth()
  @Get('shared-by-user/media-items')
  @ShareItemGetResponse({ type: MediaItemDto, isArray: true })
  async findMediaItemsSharedByUser(@GetUser('_id') userId: string) {
    return await this.shareItemService.getMediaItemsSharedByUser(userId);
  }

  @ApiBearerAuth()
  @Get('shared-by-user/playlists')
  @ShareItemGetResponse({ type: PlaylistDto, isArray: true })
  async findPlaylistsSharedByUser(@GetUser('_id') userId: string) {
    return await this.shareItemService.getPlaylistsSharedByUser(userId);
  }

  @ApiBearerAuth()
  @Get('shared-with-user')
  @ShareItemGetResponse({ type: ShareItemsResponseDto, isArray: false })
  async findItemsSharedWithUser(@GetUser('_id') userId: string) {
    return await this.shareItemService.getItemsSharedWithUser(userId);
  }

  @ApiBearerAuth()
  @Get('shared-with-user/media-items')
  @ShareItemGetResponse({ type: MediaItemDto, isArray: true })
  async findMediaItemsSharedWithUser(@GetUser('_id') userId: string) {
    return await this.shareItemService.getMediaItemsSharedWithUser(userId);
  }

  @ApiBearerAuth()
  @Get('shared-with-user/playlists')
  @ShareItemGetResponse({ type: PlaylistDto, isArray: true })
  async findPlaylistsSharedWithUser(@GetUser('_id') userId: string) {
    return await this.shareItemService.getPlaylistsSharedWithUser(userId);
  }

  @Get(RouteTokens.shareId)
  @ApiParam({ name: RouteTokens.shareId, type: String, required: true })
  @ShareItemGetResponse()
  async findShareItem(@Param(RouteTokens.shareId, new ObjectIdPipe()) shareId: ObjectId) {
    return await this.shareItemService.findOne(shareId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @Post(`read/${RouteTokens.shareId}`) // TODO: Why is this a POST? Shouldn't we be using ShareItemPostResponse as well?
  @ApiParam({ name: RouteTokens.shareId, type: String, required: true })
  @ApiResponse({ type: ShareItem, status: 200 })
  async readShareItem(@Param(RouteTokens.shareId, new ObjectIdPipe()) shareId: ObjectId) {
    return await this.shareItemService.update(shareId, { read: true });
  }

  @Delete(RouteTokens.shareId)
  @ApiParam({ name: RouteTokens.shareId, type: String, required: true })
  @ShareItemGetResponse()
  async removeShareItem(@Param(RouteTokens.shareId, new ObjectIdPipe()) shareId: ObjectId) {
    return await this.shareItemService.remove(shareId);
  }

  @Post('unshare-all-items')
  @ApiBody({ type: () => ShareItemsDto })
  async removeAllShareItems(@Body() shareItemsDto: ShareItemsDto) {
    await this.shareItemService.removeShareItems(shareItemsDto.shareItemIds);
  }

  // TODO: Fix me!
  @Post('unshare-all-by-user-id')
  @ApiBody({ type: () => ShareItemsByUserIdDto })
  async removeShareItemAllByUserId(@Body() shareItemsByUserIdDto: ShareItemsByUserIdDto) {
    // await this.shareItemService.removeUserConnectionShareItems(shareItemsByUserIdDto.shareItemByUserIds);
  }
}
