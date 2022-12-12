import { UserDetails } from 'src/utils/types';

export interface IUsersServices {
  validateUser(details: UserDetails);
  findUser(id: string);
}
