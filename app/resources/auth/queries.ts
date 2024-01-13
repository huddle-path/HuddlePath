import { DURATIONS } from '@app/constants/general';
import { IHttpResponse } from '@app/handlers/api-response/types';
import { UseQueryOptions, useQuery } from 'react-query';
import { USER_ROLES_TYPE } from '../user/types';
import { apiHttp } from '@lib/axiosConfig';

export const authQueryKeys = {
  all: [{ scope: 'auth' }] as const,
  activeRole: () => [{ ...authQueryKeys.all[0], entity: 'role' }] as const,
  token: () => [{ ...authQueryKeys.all[0], entity: 'token' }] as const,
};

async function getActiveRole(): Promise<USER_ROLES_TYPE> {
  try {
    const res = await apiHttp.get<IHttpResponse<USER_ROLES_TYPE>>(`/auth/role`);
    return res.data.data;
  } catch (error: any) {
    return error;
  }
}

export const useGetActiveRole = <
  SelectReturnType = USER_ROLES_TYPE,
  ErrorType = unknown
>(
  options?: Partial<
    UseQueryOptions<
      USER_ROLES_TYPE,
      ErrorType,
      SelectReturnType,
      ReturnType<(typeof authQueryKeys)['activeRole']>
    >
  >
) => {
  return useQuery<
    USER_ROLES_TYPE,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof authQueryKeys)['activeRole']>
  >({
    queryFn: () => getActiveRole(),
    queryKey: authQueryKeys.activeRole(),
    staleTime: DURATIONS.thirtyMins,
    refetchInterval: DURATIONS.thirtyMins,
    ...options,
  });
};
