import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateChildrenDetails,
  CreateKidActivityDetails,
  CreateSubscriptionDetails,
  CreateVideoForChildrenDetails,
  CreateVideoHistoryDetails,
  ModifyChildrenForChildrenDetails,
  ModifyChildrenForParentDetails,
  UserDetails,
} from 'src/utils/types';
import { Children } from './schemas/children.schema';
import { KidActivity } from './schemas/kidActivity.schema';
import { User, UserDocument } from './schemas/user.schema';
import { IUsersService } from './users';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) {}

  async validateUser(details: UserDetails): Promise<User> {
    const { google_id, email, name, picture } = details;
    return this.usersModel
      .findOneAndUpdate(
        { google_id },
        { name, picture, email },
        { new: true, upsert: true },
      )
      .lean();
  }

  async findUser(id: string): Promise<User> {
    return this.usersModel.findById(id).lean();
  }

  async createChildren(
    body: CreateChildrenDetails,
    userId: string,
  ): Promise<Children> {
    const { childrens }: User = await this.usersModel
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
    return childrens[childrens.length - 1];
  }

  async getChildren(userId: string, childrenId: string): Promise<Children> {
    const { childrens }: User = await this.usersModel
      .findOne({
        google_id: userId,
      })
      .lean();
    return childrens.find((c) => c._id == childrenId);
  }

  async updateSecretPasswordChildren(
    userId: string,
    childrenId: string,
    secretPassword: string,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
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
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async updateContentSettingChildren(
    userId: string,
    childrenId: string,
    contentSetting: string,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
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
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async addVideoHistory(
    userId: string,
    childrenId: string,
    video: CreateVideoHistoryDetails,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
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
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async clearVideosHistory(
    userId: string,
    childrenId: string,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
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
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async updateChildrenForChildren(
    userId: string,
    childrenId: string,
    data: ModifyChildrenForChildrenDetails,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
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
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async updateChildrenForParent(
    userId: string,
    childrenId: string,
    data: ModifyChildrenForParentDetails,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
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
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async deleteChildren(userId: string, childrenId: string): Promise<User> {
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

  async listChildrens(userId: string): Promise<Children[]> {
    const { childrens }: User = await this.usersModel
      .findOne({ google_id: userId })
      .lean();
    return childrens;
  }

  async addVideoForChildren(
    userId: string,
    childrenId: string,
    video: CreateVideoForChildrenDetails,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
      .findOneAndUpdate(
        { google_id: userId, 'childrens._id': childrenId },
        {
          $push: {
            'childrens.$.approvedContent': video,
          },
        },
        { new: true },
      )
      .lean();
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async removeVideoForChildren(
    userId: string,
    childrenId: string,
    videoId: string,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
      .findOneAndUpdate(
        { google_id: userId, 'childrens._id': childrenId },
        {
          $pull: {
            'childrens.$.approvedContent': {
              videoId,
            },
          },
        },
        { new: true },
      )
      .lean();
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async updateSecretPassword(userId: string, password: string): Promise<User> {
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

  async setTimeExpire(userId: string, childrenId: string): Promise<Children> {
    const findExpire = await this.usersModel
      .findOne({ google_id: userId })
      .lean();
    if (
      findExpire.childrens.some((c) => c._id == childrenId && c.timeExpire <= 0)
    ) {
      throw new HttpException('conflict', HttpStatus.CONFLICT);
    }
    const user: User = await this.usersModel
      .findOneAndUpdate(
        {
          google_id: userId,
          'childrens._id': childrenId,
        },
        {
          $inc: {
            'childrens.$.timeExpire': -1,
          },
        },
        { new: true },
      )
      .lean();
    return user.childrens.find(({ _id }) => _id == childrenId);
  }

  reSetTimeExpire(): void {
    this.usersModel.updateMany(
      {},
      {
        $set: {
          'childrens.$[].timeExpire': 60,
        },
      },
      { multi: true },
      () => ({}),
    );
    return;
  }

  // async updateKidActivity(
  //   userId: string,
  //   childrenId: string,
  //   data: UpdateKidActivityDetails,
  // ): Promise<User> {
  //   const user = await this.usersModel
  //     .findOneAndUpdate(
  //       {
  //         google_id: userId,
  //         'kids_activity.childrenId': childrenId,
  //       },
  //       {
  //         $set: {
  //           'kids_activity.$.name': data.name,
  //           'kids_activity.$.picture': data.picture,
  //           'kids_activity.$.type': data.type,
  //           'kids_activity.$.activity': data.activity,
  //         },
  //       },
  //       { new: true },
  //     )
  //     .lean();

  //   if (!user) {
  //     return this.usersModel
  //       .findOneAndUpdate(
  //         { google_id: userId },
  //         {
  //           $push: {
  //             kids_activity: { childrenId, ...data },
  //           },
  //         },
  //         { new: true },
  //       )
  //       .lean();
  //   }

  //   return user;
  // }

  async blockVideo(
    userId: string,
    childrenId: string,
    videoId: string,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
      .findOneAndUpdate(
        {
          google_id: userId,
          'childrens._id': childrenId,
        },
        {
          $push: {
            'childrens.$.block_video': videoId,
          },
        },
        { new: true },
      )
      .lean();
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async clearBlockVideo(
    userId: string,
    childrenId: string,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
      .findOneAndUpdate(
        {
          google_id: userId,
          'childrens._id': childrenId,
        },
        {
          $set: {
            'childrens.$.block_video': [],
          },
        },
        { new: true },
      )
      .lean();
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async updateAllowSearch(
    userId: string,
    childrenId: string,
    allowSearch: boolean,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
      .findOneAndUpdate(
        {
          google_id: userId,
          'childrens._id': childrenId,
        },
        {
          $set: {
            'childrens.$.allow_search': allowSearch,
          },
        },
        { new: true },
      )
      .lean();
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async subscribeChannel(
    userId: string,
    childrenId: string,
    data: CreateSubscriptionDetails,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
      .findOneAndUpdate(
        {
          google_id: userId,
          'childrens._id': childrenId,
        },
        {
          $push: {
            'childrens.$.subscriptions': data,
          },
        },
        { new: true },
      )
      .lean();
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async unsubscribeChannel(
    userId: string,
    childrenId: string,
    channelId: string,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
      .findOneAndUpdate(
        {
          google_id: userId,
          'childrens._id': childrenId,
        },
        {
          $pull: {
            'childrens.$.subscriptions': {
              channelId,
            },
          },
        },
        { new: true },
      )
      .lean();
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async blockChannel(
    userId: string,
    childrenId: string,
    channelId: string,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
      .findOneAndUpdate(
        {
          google_id: userId,
          'childrens._id': childrenId,
        },
        {
          $push: {
            'childrens.$.block_channel': channelId,
          },
        },
        { new: true },
      )
      .lean();
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async clearBlockChannel(
    userId: string,
    childrenId: string,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
      .findOneAndUpdate(
        {
          google_id: userId,
          'childrens._id': childrenId,
        },
        {
          $set: {
            'childrens.$.block_channel': [],
          },
        },
        { new: true },
      )
      .lean();
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async updateAllowChat(
    userId: string,
    childrenId: string,
    allowChat: boolean,
  ): Promise<{ children: Children; childrens: Children[] }> {
    const { childrens }: User = await this.usersModel
      .findOneAndUpdate(
        {
          google_id: userId,
          'childrens._id': childrenId,
        },
        {
          $set: {
            'childrens.$.allow_chat': allowChat,
          },
        },
        { new: true },
      )
      .lean();
    return {
      children: childrens.find(({ _id }) => _id == childrenId),
      childrens,
    };
  }

  async getKidsActivity(userId: string): Promise<KidActivity[]> {
    const { kids_activity }: User = await this.usersModel.findOne({
      google_id: userId,
    });
    return kids_activity;
  }

  async createKidActivity(
    userId: string,
    data: CreateKidActivityDetails,
  ): Promise<User> {
    const user = await this.usersModel
      .findOneAndUpdate(
        { google_id: userId },
        {
          $push: {
            kids_activity: data,
          },
        },
        { new: true },
      )
      .lean();
    return user;
  }
}
