import { Controller, Get, UseGuards, Req, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '@prisma/client';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator/get-user.decorator';

@Controller('api/v1/user')
export class UserController {
  //   @UseGuards(AuthGuard('jwt'))
  //   @Get()
  //   getMe(@Req() req: Request) {
  //     return req.user;
  //   }

  @UseGuards(JwtGuard)
  @Get()
  getMe(@GetUser() user: User, @GetUser('email') email: string) {
    console.log(email);

    return user;
  }

  @Patch()
  editUser() {}
}
