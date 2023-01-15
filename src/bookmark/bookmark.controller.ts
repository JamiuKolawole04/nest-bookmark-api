import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Delete,
  Post,
  Param,
  ParseUUIDPipe,
  Body,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { createBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('api/v1/bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}
  @Post()
  createBookmark(
    @GetUser('id') userId: string,
    @Body() dto: createBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Get()
  getBookmarks(@GetUser('id') userId: string) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: string,
    @Param('id', ParseUUIDPipe) bookmarkId: string,
  ) {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @Patch()
  editBookmarkById(
    @GetUser('id') userId: string,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(userId, dto);
  }

  @Delete()
  deleteBookmarkById(
    @GetUser('id') userId: string,
    @Param('id', ParseUUIDPipe) bookmarkId: string,
  ) {}
}
