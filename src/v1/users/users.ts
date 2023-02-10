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
import { User } from './schemas/user.schema';

export interface IUsersService {
  validateUser(details: UserDetails): Promise<User>;

  findUser(id: string): Promise<User>;

  createChildren(
    body: CreateChildrenDetails,
    userId: string,
  ): Promise<Children>;

  getChildren(userId: string, childrenId: string): Promise<Children>;

  updateSecretPasswordChildren(
    userId: string,
    childrenId: string,
    secretPassword: string,
  ): Promise<{ children: Children; childrens: Children[] }>;

  updateContentSettingChildren(
    userId: string,
    childrenId: string,
    contentSetting: string,
  ): Promise<{ children: Children; childrens: Children[] }>;

  addVideoHistory(
    userId: string,
    childrenId: string,
    video: CreateVideoHistoryDetails,
  ): Promise<{ children: Children; childrens: Children[] }>;

  clearVideosHistory(
    userId: string,
    childrenId: string,
  ): Promise<{ children: Children; childrens: Children[] }>;

  updateChildrenForChildren(
    userId: string,
    childrenId: string,
    data: ModifyChildrenForChildrenDetails,
  ): Promise<{ children: Children; childrens: Children[] }>;

  updateChildrenForParent(
    userId: string,
    childrenId: string,
    data: ModifyChildrenForParentDetails,
  ): Promise<{ children: Children; childrens: Children[] }>;

  deleteChildren(userId: string, childrenId: string): Promise<User>;

  listChildrens(userId: string): Promise<Children[]>;

  addVideoForChildren(
    userId: string,
    childrenId: string,
    video: CreateVideoForChildrenDetails,
  ): Promise<{ children: Children; childrens: Children[] }>;

  removeVideoForChildren(
    userId: string,
    childrenId: string,
    videoId: string,
  ): Promise<{ children: Children; childrens: Children[] }>;

  updateSecretPassword(userId: string, password: string): Promise<User>;

  setTimeExpire(userId: string, childrenId: string): Promise<Children>;

  reSetTimeExpire(): void;

  // updateKidActivity(
  //   userId: string,
  //   childrenId: string,
  //   data: UpdateKidActivityDetails,
  // ): Promise<User>;

  blockVideo(
    userId: string,
    childrenId: string,
    videoId: string,
  ): Promise<{ children: Children; childrens: Children[] }>;

  clearBlockVideo(
    userId: string,
    childrenId: string,
  ): Promise<{ children: Children; childrens: Children[] }>;

  // blockSearch(
  //   userId: string,
  //   childrenId: string,
  // ): Promise<{ children: Children; childrens: Children[] }>;

  updateAllowSearch(
    userId: string,
    childrenId: string,
    allowSearch: boolean,
  ): Promise<{ children: Children; childrens: Children[] }>;

  subscribeChannel(
    userId: string,
    childrenId: string,
    data: CreateSubscriptionDetails,
  ): Promise<{ children: Children; childrens: Children[] }>;

  unsubscribeChannel(
    userId: string,
    childrenId: string,
    channelId: string,
  ): Promise<{ children: Children; childrens: Children[] }>;

  blockChannel(
    userId: string,
    childrenId: string,
    channelId: string,
  ): Promise<{ children: Children; childrens: Children[] }>;

  clearBlockChannel(
    userId: string,
    childrenId: string,
  ): Promise<{ children: Children; childrens: Children[] }>;

  // blockChat(
  //   userId: string,
  //   childrenId: string,
  // ): Promise<{ children: Children; childrens: Children[] }>;

  updateAllowChat(
    userId: string,
    childrenId: string,
    allowChat: boolean,
  ): Promise<{ children: Children; childrens: Children[] }>;

  getKidsActivity(userId: string): Promise<KidActivity[]>;

  createKidActivity(
    userId: string,
    data: CreateKidActivityDetails,
  ): Promise<User>;
}
