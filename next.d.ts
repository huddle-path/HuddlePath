import { NextRequest } from 'next/server';
import { USER_ROLES_TYPE } from '@app/resources/user/types';
import { IAuth } from '@app/resources/auth/types';

declare interface NextRequest extends NextRequest {
  /**
   * `auth` can be undefined if the route is not wrapped within withAuthentication
   */
  auth: IAuth;
  /**
   * `activeRole` can be undefined if the route is not wrapped within withAuthentication
   */
  activeRole: USER_ROLES_TYPE;
}
