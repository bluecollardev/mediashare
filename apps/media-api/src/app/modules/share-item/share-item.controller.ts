import { Controller, Param, HttpCode, UseGuards, HttpStatus, Get, Delete, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { ObjectIdPipe } from '@mediashare/shared';
import RouteTokens from '@api-modules/app-config/constants/open-api.constants';
import { GetUserId } from '@api-core/decorators/user.decorator';
import { ShareItemService } from './share-item.service';
import { ShareItemsByUserIdDto, ShareItemsDto, ShareItemsResponseDto } from './dto/share-item.dto';
import { ShareItemGetResponse } from './share-item.decorator';
import { ShareItem } from './entities/share-item.entity';
import { MediaItemResponseDto } from '@api-modules/media-item/dto/media-item-response.dto';
import { PlaylistResponseDto } from '@api-modules/playlist/dto/playlist-response.dto';
import { UserGuard } from '@api-modules/user/user.guard';

@ApiTags('share-items')
@Controller('share-items')
export class ShareItemController {
  constructor(private readonly shareItemService: ShareItemService) {}

  @Get('shared-by-user')
  @ShareItemGetResponse({ type: ShareItemsResponseDto, isArray: true })
  async findItemsSharedByUser(@GetUserId() userId: string) {
    return await this.shareItemService.getItemsSharedByUser(userId);
  }

  @Get('shared-by-user/media-items')
  @ShareItemGetResponse({ type: MediaItemResponseDto, isArray: true })
  async findMediaItemsSharedByUser(@GetUserId() userId: string) {
    return await this.shareItemService.getMediaItemsSharedByUser(userId);
  }
  @Get('shared-by-user/playlists')
  @ShareItemGetResponse({ type: PlaylistResponseDto, isArray: true })
  async findPlaylistsSharedByUser(@GetUserId() userId: string) {
    return await this.shareItemService.getPlaylistsSharedByUser(userId);
  }

  @Get('shared-with-user')
  @ShareItemGetResponse({ type: ShareItemsResponseDto, isArray: true })
  async findItemsSharedWithUser(@GetUserId() userId: string) {
    return await this.shareItemService.getItemsSharedWithUser(userId);
  }

  @Get('shared-with-user/media-items')
  @ShareItemGetResponse({ type: MediaItemResponseDto, isArray: true })
  async findMediaItemsSharedWithUser(@GetUserId() userId: string) {
    return await this.shareItemService.getMediaItemsSharedWithUser(userId);
  }
  @Get('shared-with-user/playlists')
  @ShareItemGetResponse({ type: PlaylistResponseDto, isArray: true })
  async findPlaylistsSharedWithUser(@GetUserId() userId: string) {
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

  @Post('unshare-all-items')
  @ApiBody({ type: () => ShareItemsDto })
  async removeShareItemAll(@Body() shareItemsDto: ShareItemsDto) {
    await this.shareItemService.removeShareItemAll(shareItemsDto.shareItemIds);
  }

  @Post('unshare-all-by-user-id')
  @ApiBody({ type: () => ShareItemsByUserIdDto })
  async removeShareItemAllByUserId(@Body() shareItemsByUserIdDto: ShareItemsByUserIdDto) {
    await this.shareItemService.removeShareItemAllByUserId(shareItemsByUserIdDto.shareItemByUserIds);
  }
}
