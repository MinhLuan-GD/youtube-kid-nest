import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from 'src/utils/types';
import { User, UserDocument } from './schemas/user.schema';
import { IUsersServices } from './users';

@Injectable()
export class UsersService implements IUsersServices {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) {}
  validateUser(details: UserDetails) {
    const { email, name, picture } = details;
    return this.usersModel
      .findOneAndUpdate(
        { email },
        { name, picture },
        { new: true, upsert: true },
      )
      .lean();
  }

  findUser(id: string) {
    return this.usersModel.findById(id).lean();
  }
}
