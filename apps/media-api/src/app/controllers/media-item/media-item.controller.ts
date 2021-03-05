import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { MediaItemService } from './media-item.service';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { UpdateMediaItemDto } from './dto/update-media-item.dto';

import { badRequestResponse, notFoundResponse } from '../../core/functors/http-errors.functor';

import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { mediaCategories, MEDIA_CATEGORY, MediaCategoryType } from '@core-lib';
import { GetUser } from '../../core/decorators/user.decorator';
import { SessionUserInterface } from '../../core/models/auth-user.model';
import { ObjectId } from 'mongodb';
import { MediaGetResponse, MediaPostResponse } from './media-item.decorator';
import { UseJwtGuard } from '../../modules/auth/auth.decorator';

@ApiTags('media-items')
@Controller('media-items')
export class MediaItemController {
  constructor(private readonly mediaItemService: MediaItemService, private shareItemService: ShareItemService) {}

  /**
   * Create a new user
   *
   * SessionUser:
   * authId: string;
   * username: string;
   * password: string;
   * email: string;
   * createdAt: Date;
   * _id: string;
   * roles: BcRolesType[];
   *
   * @param {CreateMediaItemDto} createMediaItemDto
   * @param {SessionUserInterface} user
   * @return {*}
   * @memberof MediaItemController
   */
  @MediaPostResponse()
  @Post()
  create(@Body() createMediaItemDto: CreateMediaItemDto, @GetUser() user: SessionUserInterface) {
    const { _id: userId } = user;
    return this.mediaItemService.create({ ...createMediaItemDto, userId: new ObjectId(userId) });
  }

  /* TODO: findout what this needs to be */
  @UseGuards(JwtAuthGuard)
  @Get()
  @MediaGetResponse({ isArray: true })
  findAll() {
    // const { roles = [], _id } = user;
    // if ( roles.includes( bcRoles.admin ) )
    return this.mediaItemService.findAll();
    // return this.mediaItemService.findMediaItemsByUserId(_id);
  }

  @Get('categories')
  @ApiResponse({ type: () => MEDIA_CATEGORY, isArray: true })
  getCategories() {
    return MEDIA_CATEGORY;
  }

  @MediaGetResponse()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (typeof id !== 'string') throw badRequestResponse(`${id} must be of type string`);

    const mediaItem = await this.mediaItemService.findOne(id);

    if (!mediaItem) throw notFoundResponse('mediaItem', { args: { id } });
    return mediaItem;
  }

  @MediaPostResponse()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMediaItemDto: UpdateMediaItemDto) {
    return this.mediaItemService.update(id, updateMediaItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.mediaItemService.remove(id);

    if (!deleted) throw notFoundResponse(id);

    return deleted;
  }

  @Post(':id/share/:userId')
  @MediaPostResponse()
  async share(@Param('id') id: string, @Param('userId') userIdStr: string, @Res() response: Response) {
    const { userId: createdBy, title } = await this.mediaItemService.findOne(id);
    if (!title && !createdBy) return response.status(HttpStatus.NOT_FOUND);
    const userId = new ObjectId(userIdStr);

    const mediaId = new ObjectId(id);

    const shareItem = await this.shareItemService.createMediaShareItem({
      createdBy,
      userId,
      mediaId,
      title,
    });
    response.status(HttpStatus.CREATED);

    return response.send(shareItem);
  }
}
