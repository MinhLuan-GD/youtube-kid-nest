/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Services } from 'src/utils/constants';
import { User } from 'src/v1/users/schemas/user.schema';
import { IUsersService } from 'src/v1/users/users';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.usersService.findUser(payload._id);
    return user ? done(null, user) : done(null, null);
  }
}
