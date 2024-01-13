import { apiResponse } from '@app/handlers/api-response/response-handler';
import dbConnect from '@lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

const withDbConnection =
  (handler: Function) => async (req: NextRequest, res: NextResponse) => {
    try {
      await dbConnect();
      return await handler(req, res);
    } catch (error) {
      console.error('Database connection error', error);
      return apiResponse({ status: 500, message: 'SERVER_ERROR' });
    }
  };

export default withDbConnection;
