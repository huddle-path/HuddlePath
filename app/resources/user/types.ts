import { USER_ROLES } from './constants';

export const USER_ROLE_LIST = [...Object.values(USER_ROLES)] as USER_ROLES[];
export type USER_ROLES_TYPE = (typeof USER_ROLE_LIST)[number];

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  roles: Array<USER_ROLES_TYPE>;
  createdAt: string;
  updatedAt: string;
}
