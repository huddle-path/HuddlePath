'use client';
import withAuth from '@app/HOFs/client/withAuth';
import NAVIGATION from '@app/constants/navigation';
import AppHeader from '@components/general/AppHeader';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { IoIosAdd } from 'react-icons/io';

const Dashboard = () => {
  const t = useTranslations('general');

  return (
    <div className='h-full w-full'>
      <AppHeader />

      <div className='mt-10 px-6 flex flex-col gap-10'>
        <div>
          <p className='text-4xl font-bold mb-2'>{t('readyToEngage')}</p>
          <p className='text-lg font-light tracking-tighter'>
            {t('engagementText')}
          </p>
        </div>

        <div>
          <Card>
            <div className='flex flex-col justify-between items-center p-6 h-full'>
              <Link
                href={NAVIGATION.CREATE_EVENT}
                className='bg-huddlepath-gray p-6 rounded-full mt-20'
              >
                <IoIosAdd className='h-10 w-10' />
              </Link>
              <p className='text-sm font-semibold mb-6'>{t('createEvent')}</p>
            </div>
          </Card>
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
