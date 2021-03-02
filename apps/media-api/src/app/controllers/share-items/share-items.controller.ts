import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { GetUser } from '../../core/decorators/user.decorator';
import { AuthUserInterface } from '@core-lib';

@Controller('share-items')
export class ShareItemsController {
  constructor(private readonly shareItemService: ShareItemService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@GetUser() user: AuthUserInterface) {
    Logger.warn(user);
    return this.shareItemService.findShareItemsByUserId(
      typeof user._id === 'string' ? user._id : user._id.toHexString()
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shareItemService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shareItemService.remove(id);
  }
}
