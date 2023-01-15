import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('api/v1/user')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getMe(@Req() req: Request) {
    console.log({
      user: req.user,
    });

    return 'user info';
  }
}
