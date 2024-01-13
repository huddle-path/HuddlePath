import { NextRequest } from 'next/server';
import { IAuth } from '@app/models/auths/types';
import { USER_ROLES_TYPE } from '@app/resources/user/types';

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
