'use client';
import { useGetEvents } from '@app/resources/event/queries';
import Event from '@components/general/Event';
import EventSkeleton from '@components/general/EventSkeleton';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

const ExploreEvents = () => {
  const { data: eventData, isLoading } = useGetEvents({
    limit: 9999,
  });

  const events = useMemo(() => {
    return eventData?.pages.flatMap((p) => p.data);
  }, [eventData]);

  const t = useTranslations('events');
  return (
    <div className='max-w-screen-xl flex flex-col justify-center m-auto gap-6 mt-4'>
      <div className='w-full'>
        <div className='flex flex-row items-center justify-between'>
          <p className='text-4xl font-bold'>{t('upcoming')}</p>
        </div>
        <div className='flex flex-row items-center gap-4 mt-4'>
          <p className='text-sm text-huddlepath-cyan whitespace-nowrap'>
            {t('explore')}
          </p>
          <div className='w-full bg-black' style={{ height: 1 }}></div>
        </div>
      </div>

      <div className='flex flex-row flex-wrap gap-4'>
        {events?.map((event) => (
          <Event {...event} key={event._id} />
        ))}
      </div>

      {isLoading && (
        <div className='flex flex-row flex-wrap gap-4'>
          {Array(4)
            .fill(0)
            .map(() => (
              <EventSkeleton />
            ))}
        </div>
      )}
    </div>
  );
};

export default ExploreEvents;
