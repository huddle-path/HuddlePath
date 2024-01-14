import { DURATIONS } from '@app/constants/general';
import { IHttpResponse } from '@app/handlers/api-response/types';
import { QueryFunctionContext, UseQueryOptions, useQuery } from 'react-query';
import { IUser } from '../user/types';
import { apiHttp } from '@lib/axiosConfig';

export const userQueryKeys = {
  all: [{ scope: 'users' }] as const,
  user: (userId?: string) =>
    [
      {
        ...userQueryKeys.all[0],
        entity: 'single user',
        userId,
      },
    ] as const,
  me: () =>
    [
      {
        ...userQueryKeys.all[0],
        entity: 'authenticated user',
      },
    ] as const,
};

async function fetchLoggedInUser() {
  const res = await apiHttp.get<IHttpResponse<IUser>>('users/me');
  return res.data.data;
}

async function fetchUser({
  queryKey: [{ userId }],
}: QueryFunctionContext<ReturnType<(typeof userQueryKeys)['user']>>) {
  if (!userId) {
    return null;
  }
  const res = await apiHttp.get<IHttpResponse<IUser>>('users/' + userId);
  return res.data.data;
}

export const useGetUser = <SelectReturnType = IUser, ErrorType = unknown>(
  { userId }: { userId?: string },
  options?: UseQueryOptions<
    IUser | null,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof userQueryKeys)['user']>
  >
) => {
  return useQuery<
    IUser | null,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof userQueryKeys)['user']>
  >(userQueryKeys.user(userId), fetchUser, {
    staleTime: DURATIONS.fifteenMins,
    ...options,
  });
};

export const useGetLoggedInUser = <
  SelectReturnType = IUser,
  ErrorType = unknown
>(
  options?: UseQueryOptions<
    IUser | null,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof userQueryKeys)['me']>
  >
) => {
  return useQuery<
    IUser | null,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof userQueryKeys)['me']>
  >(userQueryKeys.me(), fetchLoggedInUser, {
    staleTime: DURATIONS.fifteenMins,
    ...options,
  });
};
