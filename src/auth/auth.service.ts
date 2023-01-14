import { Injectable, ForbiddenException } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);
    // returning only the selected data - id, email, createdAt
    // const user = await this.prisma.user.create({
    //   data: {
    //     email: dto.email,
    //     hash,
    //   },
    //   select: {
    //     id: true,
    //     email: true,
    //     createdAT: true,
    //   },
    // });

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      delete user.hash;
      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002' && err.meta.target === 'users_email_key') {
          throw new ForbiddenException('email already exists');
        }
      }
      throw err;
    }

    // save new user to db
  }
}
