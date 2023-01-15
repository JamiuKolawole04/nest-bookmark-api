import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Express } from 'express';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const requust: Express.Request = ctx.switchToHttp().getRequest();

    if (data) {
      return requust.user[data];
    }

    return requust.user;
  },
);
