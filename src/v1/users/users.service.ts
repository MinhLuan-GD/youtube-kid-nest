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

  createChildren(body: any, userId: string) {
    return this.usersModel
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
    return this.usersModel
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
  }

  updateContentSettingChildren(
    userId: string,
    childrenId: string,
    contentSetting: string,
  ) {
    return this.usersModel
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
  }

  addVideoHistory(userId: string, childrenId: string, video: any) {
    return this.usersModel
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
  }

  clearVideosHistory(userId: string, childrenId: string) {
    return this.usersModel
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
  }

  updateChildrenForChildren(userId: string, childrenId: string, data: any) {
    return this.usersModel
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
  }

  updateChildrenForParent(userId: string, childrenId: string, data: any) {
    return this.usersModel
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

  addVideoForChildren(userId: string, childrenId: string, video: any) {
    return this.usersModel
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
  }

  removeVideoForChildren(userId: string, childrenId: string, videoId: string) {
    return this.usersModel
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
