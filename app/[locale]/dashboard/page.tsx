'use client';
import withAuth from '@app/HOFs/client/withAuth';
import NAVIGATION from '@app/constants/navigation';
import { useGetEvents } from '@app/resources/event/queries';
import { useGetLoggedInUser } from '@app/resources/user/queries';
import AppHeader from '@components/general/AppHeader';
import Event from '@components/general/Event';
import EventSkeleton from '@components/general/EventSkeleton';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';
import { IoIosAdd } from 'react-icons/io';

const Dashboard = () => {
  const t = useTranslations('general');
  const { data: user } = useGetLoggedInUser({});
  const { data: eventData, isLoading } = useGetEvents(
    {
      limit: 4,
      createdBy: user?._id as string,
    },
    { enabled: Boolean(user) }
  );

  const events = useMemo(() => {
    return eventData?.pages.flatMap((p) => p.data);
  }, [eventData]);

  return (
    <div className='h-full w-full overflow-x-hidden'>
      <AppHeader />

      <div className='mt-10 px-6 flex flex-col gap-10'>
        <div>
          <p className='text-4xl font-bold mb-2'>{t('readyToEngage')}</p>
          <p className='text-lg font-light tracking-tighter'>
            {t('engagementText')}
          </p>
        </div>

        <div className='flex gap-4 flex-row flex-wrap'>
          <Card>
            <Link href={NAVIGATION.CREATE_EVENT}>
              <div className='flex flex-col justify-between items-center p-6 h-full'>
                <div className='bg-huddlepath-gray p-6 rounded-full mt-20'>
                  <IoIosAdd className='h-10 w-10' />
                </div>
                <p className='text-sm font-semibold mb-6'>{t('createEvent')}</p>
              </div>
            </Link>
          </Card>

          <div className='mb-10 gap-4 flex flex-row overflow-x-auto xl:max-w-6xl flex-wrap'>
            {events?.map((event) => (
              <Event {...event} key={event._id} />
            ))}

            {isLoading && (
              <>
                {Array(2)
                  .fill(1)
                  .map(() => (
                    <div key={Date.now() + crypto.randomUUID()}>
                      <EventSkeleton />
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);

const Card = ({ children }: any) => (
  <div className='h-96 bg-white rounded-lg shadow-sm max-w-80 w-full'>
    {children}
  </div>
);
