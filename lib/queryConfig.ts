import { MutationCache, QueryCache, QueryClient } from 'react-query';
import axios from 'axios';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err, query) => {
      if (axios.isAxiosError(err)) {
        if (err?.response?.status === 404) {
        }
      } else {
        if (err instanceof Error) {
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: async (err) => {
      if (axios.isAxiosError(err)) {
      } else {
        if (err instanceof Error) {
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      notifyOnChangeProps: 'tracked', // 🌟 Only rerenders if one of the used props used eg: {data, isFetching,...}
    },
  },
});
