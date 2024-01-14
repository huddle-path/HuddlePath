import { DURATIONS } from '@app/constants/general';
import {
  IHttpResponse,
  IQueryResponse,
} from '@app/handlers/api-response/types';
import { QueryFunctionContext, UseInfiniteQueryOptions, useInfiniteQuery } from 'react-query';
import { apiHttp } from '@lib/axiosConfig';
import { IEvent, TEventQuery } from './types';

export const eventQueryKeys = {
  all: [{ scope: 'events' }] as const,
  events: (query: TEventQuery) =>
    [
      {
        ...eventQueryKeys.all[0],
        entity: 'event list',
        ...query,
      },
    ] as const,
  event: (eventId?: string) =>
    [
      {
        ...eventQueryKeys.all[0],
        entity: 'single event',
        eventId,
      },
    ] as const,
};

const fetchEvents = async ({
  pageParam = 1,
  queryKey: [{}],
}: QueryFunctionContext<
  ReturnType<typeof eventQueryKeys.events>,
  number
>): Promise<IQueryResponse<IEvent>> => {
  const response = await apiHttp.get<IHttpResponse<IQueryResponse<IEvent>>>(
    `/event?page=${pageParam}`
  );

  return response.data.data;
};

export const useGetEvents = <
  SelectData = IQueryResponse<IEvent>,
  Error = unknown
>(
  query: TEventQuery,
  options?: UseInfiniteQueryOptions<
    IQueryResponse<IEvent>,
    Error,
    SelectData,
    IQueryResponse<IEvent>,
    ReturnType<(typeof eventQueryKeys)['events']>
  >
) => {
  return useInfiniteQuery<
    IQueryResponse<IEvent>,
    Error,
    SelectData,
    ReturnType<(typeof eventQueryKeys)['events']>
  >(eventQueryKeys.events(query), fetchEvents, {
    getNextPageParam: (lastPage) => {
      if (+lastPage.currentPage < lastPage.totalPages) {
        return +lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: DURATIONS.fifteenMins,
    ...options,
  });
};
