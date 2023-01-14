import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

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

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });

    // save new user to db

    delete user.hash;
    return user;
  }
}
