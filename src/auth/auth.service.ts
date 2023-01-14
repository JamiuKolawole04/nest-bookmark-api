import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';

@Injectable()
export class AuthService {
  getAuth() {
    return {
      status: 'succes',
      message: 'auth controlled successfully',
    };
  }
}
