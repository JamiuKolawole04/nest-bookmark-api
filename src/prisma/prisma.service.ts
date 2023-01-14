import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mysql://root:07086314122@localhost:3306/nest-bookmark-prisma?schema=public',
        },
      },
    });
  }
}
