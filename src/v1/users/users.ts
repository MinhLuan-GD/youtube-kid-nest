import { UserDetails } from 'src/utils/types';

export interface IUsersService {
  validateUser(details: UserDetails);
  findUser(id: string);
  createChildren(body: any, userId: string);
  getChildren(userId: string, childrenId: string);
  updateSecretPasswordChildren(
    userId: string,
    childrenId: string,
    secretPassword: string,
  );
  updateContentSettingChildren(
    userId: string,
    childrenId: string,
    contentSetting: string,
  );
  addVideoHistory(userId: string, childrenId: string, video: any);
  clearVideosHistory(userId: string, childrenId: string);
  updateChildrenForChildren(userId: string, childrenId: string, data: any);
  updateChildrenForParent(userId: string, childrenId: string, data: any);
  deleteChildren(userId: string, childrenId: string);
  listChildrens(userId: string);
  addVideoForChildren(userId: string, childrenId: string, video: any);
  removeVideoForChildren(userId: string, childrenId: string, videoId: string);
  updateSecretPassword(userId: string, password: string);
}
