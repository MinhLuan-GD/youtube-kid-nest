import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from 'src/utils/types';
import { User, UserDocument } from './schemas/user.schema';
import { IUsersService } from './users';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) {}
  validateUser(details: UserDetails) {
    const { google_id, email, name, picture } = details;
    return this.usersModel
      .findOneAndUpdate(
        { google_id },
        { name, picture, email },
        { new: true, upsert: true },
      )
      .lean();
  }

  findUser(id: string) {
    return this.usersModel.findById(id).lean();
  }

  async createChildren(body: any, userId: string) {
    const user = await this.usersModel.findOneAndUpdate(
      { google_id: userId },
      {
        $push: {
          childrens: body,
        },
      },
      { new: true },
    );
    return user.childrens[user.childrens.length - 1];
  }

  async getChildren(userId: string, childrenId: string) {
    const user = await this.usersModel.findOne({ google_id: userId });
    return user.childrens.find((c) => c._id == childrenId);
  }

  updateSecretPasswordChildren(
    userId: string,
    childrenId: string,
    secretPassword: string,
  ) {
    this.usersModel.findOneAndUpdate(
      { google_id: userId, 'childrens._id': childrenId },
      {
        $set: {
          'childrens.$.secret_password': secretPassword,
        },
      },
      {},
      () => ({}),
    );
    return 'ok';
  }

  updateContentSettingChildren(
    userId: string,
    childrenId: string,
    contentSetting: string,
  ) {
    this.usersModel.findOneAndUpdate(
      { google_id: userId, 'childrens._id': childrenId },
      {
        $set: {
          'childrens.$.content_settings': contentSetting,
        },
      },
      {},
      () => ({}),
    );
    return 'ok';
  }

  addVideoHistory(userId: string, childrenId: string, video: any) {
    this.usersModel.findOneAndUpdate(
      { google_id: userId, 'childrens._id': childrenId },
      {
        $push: {
          'childrens.$.historyWatchVideo': video,
        },
      },
      {},
      () => ({}),
    );
    return 'ok';
  }

  clearVideosHistory(userId: string, childrenId: string) {
    this.usersModel.findOneAndUpdate(
      { google_id: userId, 'childrens._id': childrenId },
      {
        $set: {
          'childrens.$.historyWatchVideo': [],
        },
      },
      {},
      () => ({}),
    );
    return 'ok';
  }

  updateChildrenForChildren(userId: string, childrenId: string, data: any) {
    this.usersModel.findOneAndUpdate(
      { google_id: userId, 'childrens._id': childrenId },
      {
        $set: {
          'childrens.$.name': data.name,
          'childrens.$.picture': data.picture,
        },
      },
      {},
      () => ({}),
    );
    return 'ok';
  }

  updateChildrenForParent(userId: string, childrenId: string, data: any) {
    this.usersModel.findOneAndUpdate(
      { google_id: userId, 'childrens._id': childrenId },
      {
        $set: {
          'childrens.$.name': data.name,
          'childrens.$.picture': data.picture,
          'childrens.$.year': data.year,
          'childrens.$.month': data.month,
        },
      },
      {},
      () => ({}),
    );
    return 'ok';
  }

  deleteChildren(userId: string, childrenId: string) {
    this.usersModel.findOneAndUpdate(
      { google_id: userId },
      {
        $pull: {
          childrens: { _id: childrenId },
        },
      },
      {},
      () => ({}),
    );
    return 'ok';
  }

  async listChildrens(userId: string) {
    const user = await this.usersModel.findOne({ google_id: userId });
    return user.childrens;
  }

  addVideoForChildren(userId: string, childrenId: string, video: any) {
    this.usersModel.findOneAndUpdate(
      { google_id: userId, 'childrens._id': childrenId },
      {
        $push: {
          'childrens.$.videos': video,
        },
      },
      {},
      () => ({}),
    );
    return 'ok';
  }

  removeVideoForChildren(userId: string, childrenId: string, videoId: string) {
    this.usersModel.findOneAndUpdate(
      { google_id: userId, 'childrens._id': childrenId },
      {
        $pull: {
          'childrens.$.videos': {
            videoId,
          },
        },
      },
      {},
      () => ({}),
    );
    return 'ok';
  }
}
