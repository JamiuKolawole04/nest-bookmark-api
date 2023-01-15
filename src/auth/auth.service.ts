import { Injectable, ForbiddenException } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
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
  }

  async signin(dto: AuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('credentials incorrect');
    }
    // compare password
    const comparePassword = await argon.verify(user.hash, dto.password);
    // if incorrect password, throw exception
    if (!comparePassword) throw new ForbiddenException('credentials incorrect');
    // send back user

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
