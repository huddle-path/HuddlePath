import { DURATIONS } from '@app/constants/general';
import { IHttpResponse } from '@app/handlers/api-response/types';
import { UseQueryOptions, useQuery } from 'react-query';
import { USER_ROLES_TYPE } from '../user/types';
import { apiHttp } from '@lib/axiosConfig';

export const userQueryKeys = {
  all: [{ scope: 'auth' }] as const,
  activeRole: (role: USER_ROLES_TYPE) =>
    [{ ...userQueryKeys.all[0], entity: 'activeRole', role }] as const,
};
