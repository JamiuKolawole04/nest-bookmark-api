import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Express } from 'express';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    if (data) {
      return request.user[data];
    }

    console.log({ user: request.user });

    return request.user;
  },
);
