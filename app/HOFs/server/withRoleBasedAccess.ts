import { apiResponse } from '@app/handlers/api-response/response-handler';
import { USER_ROLES } from '@app/resources/user/constants';
import { USER_ROLES_TYPE } from '@app/resources/user/types';
import { NextRequest } from '@next';
import { NextResponse } from 'next/server';

const withRoleBasedAccess =
  (handler: Function, allowedRoles: USER_ROLES_TYPE) =>
  async (req: NextRequest, res: NextResponse) => {
    try {
      //Check if API allowed roles includes active role
      const isAllowed = allowedRoles.includes(req.activeRole.toUpperCase());

      if (!isAllowed) {
        return apiResponse({
          status: 401,
          message: 'NOT_AUTHORIZED',
        });
      }

      return await handler(req, res);
    } catch (error: any) {
      return apiResponse({
        status: 500,
        message: 'SERVER_ERROR',
      });
    }
  };

export default withRoleBasedAccess;
