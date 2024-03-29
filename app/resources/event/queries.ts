import { DURATIONS } from '@app/constants/general';
import {
  IHttpResponse,
  IQueryResponse,
} from '@app/handlers/api-response/types';
import {
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from 'react-query';
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

export const fetchEvents = async ({
  pageParam = 1,
  queryKey: [{ createdBy, search_value, sort_by, limit }],
}: QueryFunctionContext<
  ReturnType<typeof eventQueryKeys.events>,
  number
>): Promise<IQueryResponse<IEvent>> => {
  const params: Record<string, any> = {
    sort_by,
    page: pageParam,
    search_value,
    limit,
    createdBy,
  };

  // Remove fields with null values
  Object.keys(params).forEach((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  const response = await apiHttp.get<IHttpResponse<IQueryResponse<IEvent>>>(
    `/events`,
    {
      params,
    }
  );

  return response.data.data;
};

export async function fetchEvent({
  queryKey: [{ eventId }],
}: QueryFunctionContext<ReturnType<(typeof eventQueryKeys)['event']>>) {
  if (!eventId) {
    return null;
  }
  const res = await apiHttp.get<IHttpResponse<IEvent>>('events/' + eventId);
  return res.data.data;
}

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

export const useGetEvent = <SelectReturnType = IEvent, ErrorType = unknown>(
  { eventId }: { eventId?: string },
  options?: UseQueryOptions<
    IEvent | null,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof eventQueryKeys)['event']>
  >
) => {
  return useQuery<
    IEvent | null,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof eventQueryKeys)['event']>
  >(eventQueryKeys.event(eventId), fetchEvent, {
    staleTime: DURATIONS.fifteenMins,
    ...options,
  });
};
