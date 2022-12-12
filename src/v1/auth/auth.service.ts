import { Injectable } from '@nestjs/common';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
