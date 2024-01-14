import { IHttpResponse } from '@app/handlers/api-response/types';
import { useMutation } from 'react-query';
import { apiHttp } from '@lib/axiosConfig';
import { queryClient } from '@lib/queryConfig';
import { IEvent, TUpsertEvent } from './types';
import { eventQueryKeys } from './queries';

async function createEvent(event: TUpsertEvent) {
  const res = await apiHttp.post<IHttpResponse<IEvent>>('/events', event);
  return res.data.data;
}

async function updateEvent({ id, event }: { id: string; event: TUpsertEvent }) {
  const res = await apiHttp.patch<IHttpResponse<IEvent>>(
    '/events/' + id,
    event
  );
  return res.data.data;
}

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventQueryKeys.all,
      });
    },
  });
};

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventQueryKeys.all,
      });
    },
  });
};
