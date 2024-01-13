import { NextApiRequest, NextApiResponse } from 'next';
import withDbConnection from '@app/HOFs/server/withDbConnection';
import { apiResponse } from '@app/handlers/api-response/response-handler';
import { createToken } from '@app/handlers/token/handlers';
import { TokenActionTypes } from '@app/handlers/token/constants';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import AuthModel from '@app/resources/auth/schema';

const getToken = async (req: NextRequest, res: NextApiResponse) => {
  const session = await getServerSession();

  if (!session) {
    return apiResponse({ status: 401, message: 'NOT_AUTHORIZED' });
  }

  const user = session.user;

  try {
    // Check if user has correct role and email
    const auth = await AuthModel.findOne({
      email: user?.email,
    });

    if (!auth) {
      return apiResponse({ status: 404, message: 'NOT_AUTHORIZED' });
    }

    const token = createToken({
      actionType: TokenActionTypes.AccessToken,
      id: auth._id,
    });

    const response = apiResponse({ status: 200, message: 'OK' });

    response.cookies.set('x-access-token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      secure: true,
      sameSite: 'strict',
      priority: 'high',
    });

    return response;
  } catch (e) {
    console.error(e);
    return apiResponse({ status: 500, message: 'SERVER_ERROR' });
  }
};

export const GET = withDbConnection(getToken);
