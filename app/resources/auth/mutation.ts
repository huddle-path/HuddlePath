import { IHttpResponse } from '@app/handlers/api-response/types';
import { useMutation } from 'react-query';
import { ICredentials } from './types';
import { apiHttp } from '@lib/axiosConfig';
import { queryClient } from '@lib/queryConfig';
import { authQueryKeys } from './queries';

async function loginOrRegister(credentials: ICredentials) {
  const res = await apiHttp.post<IHttpResponse<boolean>>('/auth', credentials);
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
