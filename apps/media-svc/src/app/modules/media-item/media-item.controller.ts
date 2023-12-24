import {
  handleErrorResponse,
  handleSuccessResponse,
} from '@mediashare/core/http/response';
import { AuthenticationGuard, CognitoUser } from '@nestjs-cognito/auth';
import {
  Controller,
  Body,
  Param,
  Query,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MEDIA_VISIBILITY } from '../../core/models';
import { RouteTokens } from '../../core/constants';
import {
  MediaGetResponse,
  MediaPostResponse,
  MediaPutResponse,
} from './media-item.decorator';
import { MediaItemService } from './media-item.service';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { UpdateMediaItemDto } from './dto/update-media-item.dto';
import { MediaItem } from './entities/media-item.entity';

@ApiTags('media-items')
@Controller('media-items')
export class MediaItemController {
  constructor(private readonly mediaItemService: MediaItemService) {}

  @Get('visibilities')
  getVisibilities() {
    return MEDIA_VISIBILITY;
  }

  @UseGuards(AuthenticationGuard) // @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @Post()
  @MediaPostResponse()
  async create(
    @Res() res: Response,
    @Body() createMediaItemDto: CreateMediaItemDto,
    @CognitoUser('sub') createdBy: string
  ) {
    try {
      const mediaItem: Omit<MediaItem, '_id'> = {
        isPlayable: false,
        uri: '',
        ...createMediaItemDto,
        userId: createdBy,
        createdBy,
      } as any;
      const result = await this.mediaItemService.create({
        ...mediaItem,
      } as any);
      return handleSuccessResponse(res, HttpStatus.CREATED, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard) // @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'mediaId', type: String, required: true })
  @Put(RouteTokens.mediaId)
  @MediaPutResponse()
  async update(
    @Res() res: Response,
    @Param('mediaId') mediaId: string,
    @Body() updateMediaItemDto: UpdateMediaItemDto
  ) {
    try {
      const result = await this.mediaItemService.update(
        mediaId,
        updateMediaItemDto
      );
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard) // @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'mediaId', type: String, required: true })
  @Delete(RouteTokens.mediaId)
  async remove(@Res() res: Response, @Param('mediaId') mediaId: string) {
    try {
      const result = await this.mediaItemService.remove(mediaId);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard) // @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'mediaId', type: String, required: true })
  @Get(RouteTokens.mediaId)
  @MediaGetResponse()
  async findOne(@Res() res: Response, @Param('mediaId') mediaId: string) {
    try {
      const result = await this.mediaItemService.getById(mediaId);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard) // @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'text', required: false, allowEmptyValue: true })
  @ApiQuery({
    name: 'tags',
    type: String,
    explode: true,
    isArray: true,
    required: false,
    allowEmptyValue: true,
  })
  @Get()
  @MediaGetResponse({ isArray: true })
  async findAll(
    @Res() res: Response,
    @CognitoUser('sub') userId: string,
    @Query('text') query?: string,
    @Query('tags') tags?: string[]
  ) {
    try {
      const parsedTags = Array.isArray(tags)
        ? tags
        : typeof tags === 'string'
        ? [tags]
        : undefined;
      // Always search, we want to run the aggregate query in every case
      const result =
        query || tags
          ? await this.mediaItemService.search({
              userId,
              query,
              tags: parsedTags,
            })
          : await this.mediaItemService.getBySub(userId);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard) // @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @Get('popular')
  @MediaGetResponse({ isArray: true })
  async findPopular(@Res() res: Response) {
    try {
      const result = await this.mediaItemService.getPopular();
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }
}
