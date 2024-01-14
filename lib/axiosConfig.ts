import { IHttpResponse } from '@app/handlers/api-response/types';
import { useQueryClient } from 'react-query';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import NAVIGATION from '@app/constants/navigation';
import { authQueryKeys } from '@app/resources/auth/queries';
import { useDebouncedCallback } from 'use-debounce';

export const apiHttp = axios.create({
  baseURL: '/api',
});

const useAxiosConfig = () => {
  const queryClient = useQueryClient();
  const debouncedLogout = useDebouncedCallback(async () => {
    await queryClient.resetQueries(authQueryKeys.all);
    signOut({ callbackUrl: NAVIGATION.SIGN_IN, redirect: true });
  }, 100);

  apiHttp.interceptors.response.use(
    (axios) => {
      return axios;
    },
    function (error) {
      if (axios.isAxiosError(error)) {
        const errorObj = error.response?.data as IHttpResponse<any>;
        console.log(errorObj);

        //🔐 Logout if token is invalid
        if (errorObj?.message === 'NOT_AUTHORIZED') {
          debouncedLogout();
        }
      }

      console.log('[Intercepted Response]', JSON.stringify(error.message));

      return Promise.reject(error);
    }
  );
  apiHttp.interceptors.request.use(
    (config) => {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

export default useAxiosConfig;
