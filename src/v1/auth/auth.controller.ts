import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { GoogleAuthGuard } from './utils/Guards';

@Controller({ version: '1', path: Routes.AUTH })
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
  ) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    return 'Google Oauth';
  }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect() {
    return 'Ok';
  }

  @Get('status')
  User(@Req() req: Request) {
    if (req.user) {
      return 'Authenticated';
    }
    return 'Unauthenticated';
  }
}
