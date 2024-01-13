import { apiResponse } from '@app/handlers/api-response/response-handler';
import withDbConnection from '@app/HOFs/server/withDbConnection';
import withAuthentication from '@app/HOFs/server/withAuthentication';
import { NextResponse } from 'next/server';
import { NextRequest } from '@next';

const getActiveRole = async (req: NextRequest, res: NextResponse) => {
  const response = apiResponse({
    status: 200,
    message: 'OK',
    data: req.activeRole,
  });

  response.cookies.set('activeRole', req.activeRole, {
    httpOnly: true,
    maxAge: 24 * 60 * 60,
    secure: true,
    sameSite: 'strict',
    priority: 'high',
  });

  return response;
};

export const GET = withDbConnection(withAuthentication(getActiveRole));
