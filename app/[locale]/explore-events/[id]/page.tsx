'use client';
import NAVIGATION from '@app/constants/navigation';
import { useGetEvent } from '@app/resources/event/queries';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

export default function SingleEvent({
  params: { id },
}: {
  params: { id: string };
}) {
  const t = useTranslations('events');

  const {
    data: eventData,
    isLoading,
    isError,
  } = useGetEvent({ eventId: id as string });

  const event = useMemo(() => {
    return eventData;
  }, [eventData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !event) {
    return <div>404 Not found</div>;
  }

  return (
    <div className='container mx-auto py-8'>
      <div className='p-4'>
        <div className='flex flex-row text-sm gap-4 mb-4'>
          <Link href={NAVIGATION.EXPLORE_EVENTS} className='hover:underline'>
            {t('explore')}
          </Link>
          <p>/</p>
          <p>{event.title}</p>
        </div>

        <h1 className='text-3xl font-semibold mb-4'>{event.title}</h1>
        <Image
          src={decodeURI(event.imageUrl)}
          alt={event.title}
          className='w-full max-h-96 object-cover rounded-lg'
          width={100}
          height={40}
        />
        <p className='text-gray-600 text-sm mt-2'>
          Date: {format(new Date(event.date), 'PPP')}
        </p>
        <p className='text-gray-600 text-sm'>Location: {event.location}</p>

        <h2 className='mt-4 text-lg font-semibold'>Description</h2>
        <p className='text-gray-700'>{event.description}</p>
      </div>
    </div>
  );
}
