import { Controller, Get, Param, Delete, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { GetUserId } from '../../core/decorators/user.decorator';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShareItemGetResponse } from './share-items.decorator';
import { ObjectIdPipe } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import RouteTokens from '../../modules/app-config.module.ts/constants/open-api.constants';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { UserDto } from '../user/dto/create-user.dto';
import { ShareItem } from '../../modules/share-item/entities/share-item.entity';

@ApiTags('share-items')
@Controller('share-items')
export class ShareItemsController {
  constructor(private readonly shareItemService: ShareItemService) {}

  @ShareItemGetResponse({ isArray: true })
  @Get()
  async findAll(@GetUserId() userId: ObjectId) {
    const [sharedMedia, sharedPlaylists] = await Promise.all(this.shareItemService.findShareItemsByUserId(userId));

    return { sharedMedia, sharedPlaylists };
  }

  @ShareItemGetResponse()
  @Get(RouteTokens.SHARE_ID)
  @ApiParam({ name: 'shareId', type: String, required: true })
  findOne(@Param('shareId', new ObjectIdPipe()) shareId: ObjectId) {
    return this.shareItemService.findOne(shareId);
  }

  @ShareItemGetResponse()
  @Delete(':shareId')
  @ApiParam({ name: 'shareId', type: String, required: true })
  remove(@Param('shareId', new ObjectIdPipe()) shareId: ObjectId) {
    return this.shareItemService.remove(shareId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('read/:shareId')
  @ApiParam({ name: 'shareId', type: String, required: true })
  @ApiResponse({ type: ShareItem, status: 200 })
  async readSharedItem(@Param('shareId', new ObjectIdPipe()) shareId: ObjectId) {
    const sharedItem = await this.shareItemService.update(shareId, { read: true });

    return sharedItem;
  }
}
