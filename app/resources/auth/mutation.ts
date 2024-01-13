import { IHttpResponse } from '@app/handlers/api-response/types';
import { useMutation } from 'react-query';
import { ICredentials } from '../auth/types';
import { apiHttp } from '@lib/axiosConfig';
import { queryClient } from '@lib/queryConfig';
import { authQueryKeys } from '../auth/queries';
import { USER_ROLES_TYPE } from '../user/types';
import { signIn } from 'next-auth/react';
import NAVIGATION from '@app/constants/navigation';

async function loginOrRegister(credentials: ICredentials) {
  return signIn('credentials', {
    ...credentials,
    redirect: true,
    callbackUrl: NAVIGATION.DASHBOARD,
  });
}

async function switchRole(role: USER_ROLES_TYPE) {
  const res = await apiHttp.post<IHttpResponse<boolean>>('/auth/role', role);
  return res.data.data;
}

export const useLoginOrRegister = () => {
  return useMutation({
    mutationFn: loginOrRegister,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.all,
      });
    },
  });
};

export const useSwitchRole = () => {
  return useMutation({
    mutationFn: switchRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.all,
      });
    },
  });
};
