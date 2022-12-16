import {
  CreateChildrenDetails,
  CreateVideoForChildrenDetails,
  CreateVideoHistoryDetails,
  ModifyChildrenForChildrenDetails,
  ModifyChildrenForParentDetails,
  UserDetails,
} from 'src/utils/types';

export interface IUsersService {
  validateUser(details: UserDetails): any;

  findUser(id: string): any;

  createChildren(body: CreateChildrenDetails, userId: string): any;

  getChildren(userId: string, childrenId: string): any;

  updateSecretPasswordChildren(
    userId: string,
    childrenId: string,
    secretPassword: string,
  ): any;

  updateContentSettingChildren(
    userId: string,
    childrenId: string,
    contentSetting: string,
  ): any;

  addVideoHistory(
    userId: string,
    childrenId: string,
    video: CreateVideoHistoryDetails,
  ): any;

  clearVideosHistory(userId: string, childrenId: string): any;

  updateChildrenForChildren(
    userId: string,
    childrenId: string,
    data: ModifyChildrenForChildrenDetails,
  ): any;

  updateChildrenForParent(
    userId: string,
    childrenId: string,
    data: ModifyChildrenForParentDetails,
  ): any;

  deleteChildren(userId: string, childrenId: string): any;

  listChildrens(userId: string): any;

  addVideoForChildren(
    userId: string,
    childrenId: string,
    video: CreateVideoForChildrenDetails,
  ): any;

  removeVideoForChildren(
    userId: string,
    childrenId: string,
    videoId: string,
  ): any;

  updateSecretPassword(userId: string, password: string): any;
}
