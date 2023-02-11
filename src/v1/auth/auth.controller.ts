import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { Routes } from 'src/utils/constants';
import { GoogleAuthGuard } from 'src/v1/auth/utils/guards';

@Controller({ version: '1', path: Routes.AUTH })
export class AuthController {
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    return 'Google Oauth';
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Res() res: Response) {
    return res.redirect(`${process.env.BASE_URL}/login/success`);
  }

  @Get('status')
  User(@Req() req: Request) {
    if (req.user) {
      return 'Authenticated';
    }
    return 'Unauthenticated';
  }

  @Get('success')
  success(@Req() req: Request) {
    if (req.user) {
      return {
        success: true,
        message: 'successful',
        user: req.user,
      };
    }
    return 'Unauthenticated';
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout(() => ({}));
    return res.redirect(`${process.env.BASE_URL}/login`);
  }
}
