import { Controller, Get, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';
import { GetUser } from '../../core/decorators/user.decorator';
import { AuthUserInterface } from '@core-lib';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';

@ApiTags('share-items')
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
