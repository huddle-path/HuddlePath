import { apiResponse } from '@app/handlers/api-response/response-handler';
import withDbConnection from '@app/HOFs/server/withDbConnection';
import withAuthentication from '@app/HOFs/server/withAuthentication';
import AuthModel from '@app/resources/auth/schema';
import { NextResponse } from 'next/server';
import { NextRequest } from '@next';

const getAuthenticatedUser = async (req: NextRequest, res: NextResponse) => {
  const auth = await AuthModel.findOne({ _id: req.auth._id })
    .select('-passwordHash')
    .populate({
      path: 'user',
    })
    .lean();

  return apiResponse({ status: 200, message: 'SUCCESS', data: auth });
};

export const GET = withDbConnection(withAuthentication(getAuthenticatedUser));
