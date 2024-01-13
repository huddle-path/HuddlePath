import { apiResponse } from '@app/handlers/api-response/response-handler';
import tokenValidation from '@lib/tokenValidation';
import { NextRequest } from '@next';
import { NextResponse } from 'next/server';

const withTokenValidation =
  (handler: Function) => async (req: NextRequest, res: NextResponse) => {
    try {
      // Try to validate the access token
      await tokenValidation(req);

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

export default withTokenValidation;
