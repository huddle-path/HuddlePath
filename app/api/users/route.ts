import { apiResponse } from '@app/handlers/api-response/response-handler';
import withDbConnection from '@app/HOFs/server/withDbConnection';
import withTokenValidation from '@app/HOFs/server/withTokenValidation';
import { NextResponse, NextRequest } from 'next/server';

const handler = async (req: NextRequest, res: NextResponse) => {
  return apiResponse({ status: 200, message: 'User OK', data: {} });
};

export const GET = withDbConnection(withTokenValidation(handler));
