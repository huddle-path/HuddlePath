import { IUser, USER_ROLES_TYPE } from '../user/types';

export interface IAuth {
  email: string;
  passwordHash: string;
  user: IUser;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICredentials {
  email: string;
  password: string;
}
