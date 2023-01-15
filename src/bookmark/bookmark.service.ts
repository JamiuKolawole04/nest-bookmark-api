import { Injectable } from '@nestjs/common';
import { createBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  createBookmark(userId: string, dto: createBookmarkDto) {}

  getBookmarks(userId: string) {}

  getBookmarkById(userId: string, bookmarkId: string) {}

  editBookmarkById(userId, dto: EditBookmarkDto) {}

  deleteBookmarkById() {}
}