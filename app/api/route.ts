import { apiResponse } from '@app/handlers/api-response/response-handler';

export const GET = async () => {
  return apiResponse({ status: 200, message: 'OK', data: {} });
};
