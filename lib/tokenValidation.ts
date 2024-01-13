import { JsonWebTokenError, VerifyErrors } from 'jsonwebtoken';
import { verifyToken } from '@app/handlers/token/handlers';
import { IToken } from '@app/handlers/token/types';
import AuthModel from '@app/resources/auth/schema';
import { USER_ROLES_TYPE } from '@app/resources/user/types';
import { NextRequest } from '@next';

export default async function tokenValidation(req: NextRequest) {
  const accessToken = req.cookies.get('x-access-token');

  try {
    if (!accessToken) {
      throw new Error('NOT_AUTHORIZED');
    } else {
      const payload = await verifyToken(accessToken.value);

      if (payload instanceof JsonWebTokenError) {
        throw new Error('NOT_AUTHORIZED');
      }

      const searchParams = req.nextUrl.searchParams;
      const queryRole = searchParams.get('activeRole') as USER_ROLES_TYPE;

      const auth = await AuthModel.findOne({
        _id: payload.id,
        roles: payload.activeRole,
      })
        .populate([
          {
            path: 'user',
          },
        ])
        .select('-passwordHash')
        .exec();

      if (!auth) {
        throw new Error('NOT_AUTHORIZED');
      }

      req.auth = auth;
      req.activeRole = queryRole;
      req.activeRole = payload.activeRole as USER_ROLES_TYPE;

      return {
        auth,
        queryRole,
      };
    }
  } catch (error) {
    throw new Error('NOT_AUTHORIZED');
  }
}
