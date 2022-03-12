import { Controller, Get, Body, Put, Param, Delete, UseGuards, HttpCode, Request } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiHideProperty, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { PlaylistService } from '../playlist/services/playlist.service';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';

import { ObjectId } from 'mongodb';

// import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { UserService } from '../../modules/auth/user.service';
import { BcRolesType, BC_ROLES } from '@core-lib';
import { UserGetResponse, UserPostResponse } from './decorators/user-response.decorator';
import { ObjectIdPipe } from '@mediashare/shared';
import RouteTokens from '../../modules/app-config/constants/open-api.constants';
import { PlaylistResponseDto } from '../playlist/dto/playlist-response.dto';
import { ProfileDto } from './dto/profile.dto';
import { UserGuard } from '../../modules/auth/guards/user.guard';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService, private playlistService: PlaylistService, private shareItemService: ShareItemService) {}

  @UserGetResponse({ isArray: true })
  @Get()
  async findAll(@Param('userId', new ObjectIdPipe()) userId: ObjectId) {
    return from(this.userService.findAll()).pipe(map((users) => users.filter((user) => user._id !== userId)));
  }

  @Get(RouteTokens.USER_ID)
  @ApiParam({ name: 'userId', type: String, required: true })
  @UserGetResponse({ type: ProfileDto })
  async findOne(@Param('userId', new ObjectIdPipe()) userId: ObjectId): Promise<User> {
    const result = await this.userService.getUserById(userId);
    if (result !== null) {
      return result;
    }
    // If the aggregate fails due to the user not having shared items, result will be null
    return await this.userService.findOne(userId);
  }

  @Delete(RouteTokens.USER_ID)
  @ApiParam({ name: 'userId', type: String, required: true })
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  remove(@Param('userId') userId: string): Promise<DeleteResult> {
    return this.userService.remove(userId);
  }
  @Put(RouteTokens.USER_ID)
  @UserPostResponse({ type: UserDto })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'userId', type: String, required: true })
  update(@Param('userId', new ObjectIdPipe()) userId: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ userId, updateUserDto });
  }
  @Get(':userId/playlists')
  @UserGetResponse({ type: PlaylistResponseDto, isArray: true })
  @ApiParam({ name: 'userId', type: String, required: true })
  @ApiHideProperty()
  getPlaylists(@Param('userId', new ObjectIdPipe()) userId: ObjectId) {
    return this.playlistService.getPlaylistByUserId({ userId });
  }

  @Put(':userId/roles')
  @UserPostResponse({ type: UserDto })
  @ApiBody({ enum: BC_ROLES })
  setRoles(@Param('userId') id: string, @Body() params: { roles: BcRolesType[] }) {
    const { roles = [] } = params;
    return this.userService.setRoles(id, roles);
  }
}
