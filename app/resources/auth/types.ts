import { IUser, USER_ROLES_TYPE } from '../user/types';

export interface IAuth {
  email: string;
  passwordHash: string;
  roles: USER_ROLES_TYPE[];
  user: IUser;
  accessToken: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
