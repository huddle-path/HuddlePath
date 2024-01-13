import { useMutation } from 'react-query';
import { ICredentials } from './types';
import { queryClient } from '@lib/queryConfig';
import { authQueryKeys } from './queries';
import { signIn } from 'next-auth/react';
import NAVIGATION from '@app/constants/navigation';

async function loginOrRegister(credentials: ICredentials) {
  return signIn('credentials', {
    ...credentials,
    redirect: true,
    callbackUrl: NAVIGATION.DASHBOARD,
  });
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
