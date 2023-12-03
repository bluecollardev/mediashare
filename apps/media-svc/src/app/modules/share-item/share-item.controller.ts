import { AuthenticationGuard } from '@nestjs-cognito/auth';
import {
  Controller,
  Param,
  HttpCode,
  UseGuards,
  HttpStatus,
  Get,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetClaims } from '@mediashare/core/decorators/auth.decorator';
import { RouteTokens } from '../../core/constants';
import { ShareItemService } from './share-item.service';
import {
  ShareItemsByUserIdDto,
  ShareItemsDto,
  ShareItemsResponseDto,
} from './dto/share-item.dto';
import { ShareItemGetResponse } from './share-item.decorator';
import { ShareItem } from './entities/share-item.entity';
import { MediaItemDto } from '../media-item/dto/media-item.dto';
import { PlaylistDto } from '../playlist/dto/playlist.dto';

@ApiTags('share-items')
@Controller('share-items')
export class ShareItemController {
  constructor(private readonly shareItemService: ShareItemService) {}

  /*@UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('shared-by-user')
  @ShareItemGetResponse({ type: ShareItemsResponseDto, isArray: true })
  async findItemsSharedByUser(@GetClaims('sub') userId: string) {
    return await this.shareItemService.getItemsSharedByUser(userId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('shared-by-user/media-items')
  @ShareItemGetResponse({ type: MediaItemDto, isArray: true })
  async findMediaItemsSharedByUser(@GetClaims('sub') userId: string) {
    return await this.shareItemService.getMediaItemsSharedByUser(userId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('shared-by-user/playlists')
  @ShareItemGetResponse({ type: PlaylistDto, isArray: true })
  async findPlaylistsSharedByUser(@GetClaims('sub') userId: string) {
    return await this.shareItemService.getPlaylistsSharedByUser(userId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('shared-with-user')
  @ShareItemGetResponse({ type: ShareItemsResponseDto, isArray: false })
  async findItemsSharedWithUser(@GetClaims('sub') userId: string) {
    return await this.shareItemService.getItemsSharedWithUser(userId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('shared-with-user/media-items')
  @ShareItemGetResponse({ type: MediaItemDto, isArray: true })
  async findMediaItemsSharedWithUser(@GetClaims('sub') userId: string) {
    return await this.shareItemService.getMediaItemsSharedWithUser(userId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('shared-with-user/playlists')
  @ShareItemGetResponse({ type: PlaylistDto, isArray: true })
  async findPlaylistsSharedWithUser(@GetClaims('sub') userId: string) {
    return await this.shareItemService.getPlaylistsSharedWithUser(userId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiParam({ name: RouteTokens.shareId, type: String, required: true })
  @Get(RouteTokens.shareId)
  @ShareItemGetResponse()
  async findShareItem(@Param(RouteTokens.shareId) shareId: string) {
    return await this.shareItemService.findOne(shareId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiParam({ name: RouteTokens.shareId, type: String, required: true })
  @ApiResponse({ type: ShareItem, status: 200 })
  @Post(`read/${RouteTokens.shareId}`) // TODO: Why is this a POST? Shouldn't we be using ShareItemPostResponse as well?
  @HttpCode(HttpStatus.OK)
  async readShareItem(@Param(RouteTokens.shareId) shareId: string) {
    return await this.shareItemService.update(shareId, { read: true });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiParam({ name: RouteTokens.shareId, type: String, required: true })
  @Delete(RouteTokens.shareId)
  @ShareItemGetResponse()
  async removeShareItem(@Param(RouteTokens.shareId) shareId: string) {
    return await this.shareItemService.remove(shareId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post('unshare-all-items')
  @ApiBody({ type: () => ShareItemsDto })
  async removeAllShareItems(@Body() shareItemsDto: ShareItemsDto) {
    await this.shareItemService.removeShareItems(shareItemsDto.shareItemIds);
  }

  // TODO: Fix me!
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post('unshare-all-by-user-id')
  @ApiBody({ type: () => ShareItemsByUserIdDto })
  async removeShareItemAllByUserId(@Body() shareItemsByUserIdDto: ShareItemsByUserIdDto) {
    // await this.shareItemService.removeUserConnectionShareItems(shareItemsByUserIdDto.shareItemByUserIds);
  }*/
}
