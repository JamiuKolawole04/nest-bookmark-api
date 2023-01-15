import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { createBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly prisma: PrismaService) {}
  async createBookmark(userId: string, dto: createBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });

    return bookmark;
  }

  getBookmarks(userId: string) {
    return this.prisma.bookmark.findMany({
      where: { userId },
    });
  }

  getBookmarkById(userId: string, bookmarkId: string) {}

  editBookmarkById(userId: string, bookmarkId: string, dto: EditBookmarkDto) {}

  deleteBookmarkById(userId: string, bookmarkId: string) {}
}
