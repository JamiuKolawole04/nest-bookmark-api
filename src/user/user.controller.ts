import { Controller, Get, UseGuards, Req, Patch, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '@prisma/client';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //   @UseGuards(AuthGuard('jwt'))
  //   @Get()
  //   getMe(@Req() req: Request) {
  //     return req.user;
  //   }

  @Get()
  getMe(@GetUser() user: User, @GetUser('email') email: string) {
    console.log(email);

    return user;
  }

  @Patch()
  editUser(@GetUser('id') id: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(id, dto);
  }
}
