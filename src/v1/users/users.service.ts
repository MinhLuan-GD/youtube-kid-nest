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
    const user = await this.usersModel
      .findOneAndUpdate(
        { google_id: userId },
        {
          $push: {
            childrens: body,
          },
        },
        { new: true },
      )
      .lean();
    return user.childrens[user.childrens.length - 1];
  }

  async getChildren(userId: string, childrenId: string) {
    const user = await this.usersModel.findOne({ google_id: userId });
    return user.childrens.find((c) => c._id == childrenId);
  }

  async updateSecretPasswordChildren(
    userId: string,
    childrenId: string,
    secretPassword: string,
  ) {
    const user = await this.usersModel
      .findOneAndUpdate(
        { google_id: userId, 'childrens._id': childrenId },
        {
          $set: {
            'childrens.$.secret_password': secretPassword,
          },
        },
        { new: true },
      )
      .lean();
    return user.childrens[user.childrens.length - 1];
  }

  async updateContentSettingChildren(
    userId: string,
    childrenId: string,
    contentSetting: string,
  ) {
    const user = await this.usersModel
      .findOneAndUpdate(
        { google_id: userId, 'childrens._id': childrenId },
        {
          $set: {
            'childrens.$.content_settings': contentSetting,
          },
        },
        { new: true },
      )
      .lean();
    return user.childrens[user.childrens.length - 1];
  }

  async addVideoHistory(userId: string, childrenId: string, video: any) {
    const user = await this.usersModel
      .findOneAndUpdate(
        { google_id: userId, 'childrens._id': childrenId },
        {
          $push: {
            'childrens.$.historyWatchVideo': video,
          },
        },
        { new: true },
      )
      .lean();
    return user.childrens[user.childrens.length - 1];
  }

  async clearVideosHistory(userId: string, childrenId: string) {
    const user = await this.usersModel
      .findOneAndUpdate(
        { google_id: userId, 'childrens._id': childrenId },
        {
          $set: {
            'childrens.$.historyWatchVideo': [],
          },
        },
        { new: true },
      )
      .lean();
    return user.childrens[user.childrens.length - 1];
  }

  async updateChildrenForChildren(
    userId: string,
    childrenId: string,
    data: any,
  ) {
    const user = await this.usersModel
      .findOneAndUpdate(
        { google_id: userId, 'childrens._id': childrenId },
        {
          $set: {
            'childrens.$.name': data.name,
            'childrens.$.picture': data.picture,
          },
        },
        { new: true },
      )
      .lean();
    return user.childrens[user.childrens.length - 1];
  }

  async updateChildrenForParent(userId: string, childrenId: string, data: any) {
    const user = await this.usersModel
      .findOneAndUpdate(
        { google_id: userId, 'childrens._id': childrenId },
        {
          $set: {
            'childrens.$.name': data.name,
            'childrens.$.picture': data.picture,
            'childrens.$.year': data.year,
            'childrens.$.month': data.month,
          },
        },
        { new: true },
      )
      .lean();
    return user.childrens[user.childrens.length - 1];
  }

  deleteChildren(userId: string, childrenId: string) {
    return this.usersModel
      .findOneAndUpdate(
        { google_id: userId },
        {
          $pull: {
            childrens: { _id: childrenId },
          },
        },
        { new: true },
      )
      .lean();
  }

  async listChildrens(userId: string) {
    const user = await this.usersModel.findOne({ google_id: userId });
    return user.childrens;
  }

  async addVideoForChildren(userId: string, childrenId: string, video: any) {
    const user = await this.usersModel
      .findOneAndUpdate(
        { google_id: userId, 'childrens._id': childrenId },
        {
          $push: {
            'childrens.$.videos': video,
          },
        },
        { new: true },
      )
      .lean();
    return user.childrens[user.childrens.length - 1];
  }

  async removeVideoForChildren(
    userId: string,
    childrenId: string,
    videoId: string,
  ) {
    const user = await this.usersModel
      .findOneAndUpdate(
        { google_id: userId, 'childrens._id': childrenId },
        {
          $pull: {
            'childrens.$.videos': {
              videoId,
            },
          },
        },
        { new: true },
      )
      .lean();
    return user.childrens[user.childrens.length - 1];
  }

  updateSecretPassword(userId: string, password: string) {
    return this.usersModel
      .findOneAndUpdate(
        { google_id: userId },
        {
          $set: {
            secret_password: password,
          },
        },
        { new: true },
      )
      .lean();
  }
}
