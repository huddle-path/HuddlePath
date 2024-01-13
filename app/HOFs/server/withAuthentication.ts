import { apiResponse } from '@app/handlers/api-response/response-handler';
import AuthModel from '@app/resources/auth/schema';
import UserModel from '@app/resources/user/schema';
import { NextRequest } from '@next';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const withAuthentication =
  (handler: Function) => async (req: NextRequest, res: NextResponse) => {
    try {
      const session = await getServerSession();

      if (!session) {
        return apiResponse({ status: 401, message: 'NOT_AUTHORIZED' });
      }

      const user = session.user;
      const auth = await AuthModel.findOne({
        email: user?.email,
      }).populate('user');

      if (!auth) {
        return apiResponse({ status: 401, message: 'NOT_AUTHORIZED' });
      }

      const activeRole = req.cookies.get('activeRole');

      if (!activeRole) {
        req.activeRole = auth.user.roles[0];
      }

      // validation role
      const isValidRole = await UserModel.findOne({
        email: user?.email,
        roles: activeRole?.name,
      });

      if (!isValidRole) {
        // override role
        req.activeRole = auth.user.roles[0];
      }

      // If validated, call the actual route handler
      return await handler(req, res);
    } catch (error: any) {
      if (error.message === 'NOT_AUTHORIZED') {
        return apiResponse({
          status: 401,
          message: 'NOT_AUTHORIZED',
        });
      }
      console.log(error);

      return apiResponse({
        status: 401,
        message: 'SERVER_ERROR',
      });
    }
  };

export default withAuthentication;
