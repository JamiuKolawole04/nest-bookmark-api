import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Object {
    return {
      status: 'success',
      message: 'server started successfully',
    };
  }
}
