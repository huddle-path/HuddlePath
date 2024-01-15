import { apiResponse } from '@app/handlers/api-response/response-handler';
import withDbConnection from '@app/HOFs/server/withDbConnection';
import withAuthentication from '@app/HOFs/server/withAuthentication';
import { NextRequest } from '@next';
import UserModel from '@app/resources/user/schema';

const getAuthenticatedUser = async (req: NextRequest) => {
  const user = await UserModel.findOne({ _id: req.auth.user._id })
    .select('-passwordHash')
    .lean();

  return apiResponse({ status: 200, message: 'SUCCESS', data: user });
};

const GET = withDbConnection(withAuthentication(getAuthenticatedUser));

export { GET };
