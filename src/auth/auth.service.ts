import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuth() {
    return {
      status: 'succes',
      message: 'auth controlled successfully',
    };
  }
}
