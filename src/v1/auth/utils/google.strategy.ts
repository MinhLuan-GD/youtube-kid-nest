import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { IUsersServices } from 'src/v1/users/users';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUsersServices,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:8000/api/v1/auth/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const user = await this.usersService.validateUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      picture: profile.photos[0].value,
    });
    return user || null;
  }
}
