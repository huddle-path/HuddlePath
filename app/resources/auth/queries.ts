import { DURATIONS } from '@app/constants/general';
import { IHttpResponse } from '@app/handlers/api-response/types';
import { UseQueryOptions, useQuery } from 'react-query';
import { USER_ROLES_TYPE } from '../user/types';
import { apiHttp } from '@lib/axiosConfig';

export const authQueryKeys = {
  all: [{ scope: 'auth' }] as const,
  activeRole: (role: USER_ROLES_TYPE) =>
    [{ ...authQueryKeys.all[0], entity: 'role', role }] as const,
  token: () => [{ ...authQueryKeys.all[0], entity: 'token' }] as const,
};

async function getAccessToken(): Promise<boolean> {
  try {
    const res = await apiHttp.get<IHttpResponse<true>>(`/token`);
    return res.data.data !== undefined;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const useGetAccessToken = <
  SelectReturnType = boolean,
  ErrorType = unknown
>(
  options?: Partial<
    UseQueryOptions<
      boolean,
      ErrorType,
      SelectReturnType,
      ReturnType<(typeof authQueryKeys)['token']>
    >
  >
) => {
  return useQuery<
    boolean,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof authQueryKeys)['token']>
  >({
    queryFn: () => getAccessToken(),
    queryKey: authQueryKeys.token(),
    staleTime: DURATIONS.thirtyMins,
    refetchInterval: DURATIONS.thirtyMins,
    ...options,
  });
};
