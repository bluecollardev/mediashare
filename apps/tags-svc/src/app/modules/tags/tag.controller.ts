import {
  handleErrorResponse,
  handleSuccessResponse,
} from '@mediashare/core/http/response';
import { AuthenticationGuard } from '@nestjs-cognito/auth';
import {
  Controller,
  Param,
  Get,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RouteTokens } from '../../core/constants';
import { TagGetResponse } from './tag.decorator';
import { TagService } from './tag.service';

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'tagId', type: String, required: true })
  @Delete(RouteTokens.tagId)
  async remove(@Res() res: Response, @Param('tagId') tagId: string) {
    try {
      const result = await this.tagService.remove(tagId);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'tagId', type: String, required: true })
  @Get(RouteTokens.tagId)
  @TagGetResponse()
  async findOne(@Res() res: Response, @Param('tagId') tagId: string) {
    try {
      const result = await this.tagService.findOne(tagId);
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get()
  @TagGetResponse({ isArray: true })
  async findAll(@Res() res: Response) {
    try {
      const result = await this.tagService.findAll();
      return handleSuccessResponse(res, HttpStatus.OK, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  /* @UseGuards(AuthenticationGuard, UserGuard)
  @ApiBearerAuth()
  @Get('popular')
  async findPopular(@Res() res: Response) {
  } */
}
