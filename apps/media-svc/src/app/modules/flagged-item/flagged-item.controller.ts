import {
  handleErrorResponse,
  handleSuccessResponse,
} from '@mediashare/core/http/response';
import { AuthenticationGuard, CognitoUser } from '@nestjs-cognito/auth';
import {
  Controller,
  Param,
  UseGuards,
  HttpStatus,
  Res,
  Get,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ParamTokens, RouteTokens } from '../../core/constants';
import { FlaggedItemService } from './flagged-item.service';
import { MediaItemService } from '../media-item/media-item.service';
import { PlaylistService } from '../playlist/playlist.service';
import {
  FlaggedItemsByUserIdDto,
  FlaggedItemsDto,
  MediaFlaggedItemDto,
  PlaylistFlaggedItemDto,
  FlaggedItemsIdsDto,
} from './dto/flagged-item.dto';
import { FlaggedItemGetResponse } from './flagged-item.decorator';

@ApiTags('flagged-items')
@Controller('flagged-items')
export class FlaggedItemController {
  constructor(
    private readonly flaggedItemService: FlaggedItemService,
    private readonly mediaItemService: MediaItemService,
    private readonly playlistService: PlaylistService
  ) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post(`user/${RouteTokens.userSub}/playlist/${RouteTokens.playlistId}`)
  @ApiParam({ name: ParamTokens.playlistId, type: String, required: true })
  @ApiParam({ name: ParamTokens.userSub, type: String, required: true })
  @FlaggedItemGetResponse({ type: PlaylistFlaggedItemDto, isArray: true })
  async flagPlaylist(
    @Param(ParamTokens.playlistId) playlistId: string,
    @Param(ParamTokens.userSub) userSub: string,
    @CognitoUser('sub') createdBy: string,
    @Res() res: Response
  ) {
    try {
      const { title } = await this.playlistService.findOne(playlistId);
      if (!title && !createdBy) return res.status(HttpStatus.NOT_FOUND);

      const result = await this.flaggedItemService.createPlaylistFlaggedItem({
        userSub,
        playlistId,
        createdBy,
      });
      return handleSuccessResponse(res, HttpStatus.CREATED, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post(`user/${RouteTokens.userSub}/media-item/${RouteTokens.mediaId}`)
  @ApiParam({ name: ParamTokens.mediaId, type: String, required: true })
  @ApiParam({ name: ParamTokens.userSub, type: String, required: true })
  @FlaggedItemGetResponse({ type: MediaFlaggedItemDto, isArray: true })
  async flagMediaItem(
    @Param(ParamTokens.mediaId) mediaId: string,
    @Param(ParamTokens.userSub) userSub: string,
    @CognitoUser('sub') createdBy: string,
    @Res() res: Response
  ) {
    try {
      const { title } = await this.mediaItemService.findOne(mediaId);
      if (!title && !createdBy) return res.status(HttpStatus.NOT_FOUND);

      const result = await this.flaggedItemService.createMediaFlaggedItem({
        createdBy,
        userSub,
        mediaId,
      });
      return handleSuccessResponse(res, HttpStatus.CREATED, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiParam({ name: ParamTokens.flaggedId, type: String, required: true })
  @Get(RouteTokens.flaggedId)
  @FlaggedItemGetResponse()
  async findFlaggedItem(@Param(ParamTokens.flaggedId) flaggedId: string) {
    return await this.flaggedItemService.dataService.findOne(flaggedId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiParam({ name: ParamTokens.flaggedId, type: String, required: true })
  @Delete(RouteTokens.flaggedId)
  @FlaggedItemGetResponse()
  async removeFlaggedItem(@Param(ParamTokens.flaggedId) flaggedId: string) {
    return await this.flaggedItemService.dataService.remove(flaggedId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post('unflag-all-items')
  @ApiBody({ type: () => FlaggedItemsDto })
  async removeAllFlaggedItems(@Body() flaggedItemsDto: FlaggedItemsIdsDto) {
    await this.flaggedItemService.removeFlaggedItems(
      flaggedItemsDto.flaggedItemIds
    );
  }

  // TODO: Fix me!
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post('unflag-all-by-user-id')
  @ApiBody({ type: () => FlaggedItemsByUserIdDto })
  async removeFlaggedItemAllByUserId(
    @Body() flaggedItemsByUserIdDto: FlaggedItemsByUserIdDto
  ) {
    // await this.flaggedItemService.removeUserConnectionFlaggedItems(flaggedItemsByUserIdDto.flaggedItemByUserIds);
  }
}
