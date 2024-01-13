import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { TbArrowLeft, TbArrowRight, TbArrowUpRight } from 'react-icons/tb';

export const ExploreEvents = () => {
  const t = useTranslations('events');
  return (
    <div className='max-w-screen-xl flex flex-col justify-center m-auto'>
      <div className='w-full'>
        <div className='flex flex-row items-center justify-between'>
          <p className='text-4xl font-bold'>{t('upcoming')}</p>
          <div className='flex flex-row gap-2'>
            <TbArrowLeft className='border border-black rounded-full h-6 w-6 p-1' />
            <TbArrowRight className='border border-black rounded-full h-6 w-6 p-1' />
          </div>
        </div>
        <div className='flex flex-row items-center gap-4 mt-4'>
          <p className='text-sm text-huddlepath-cyan whitespace-nowrap'>
            {t('explore')}
          </p>
          <div className='w-full bg-black' style={{ height: 1 }}></div>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='mt-4'>
          <Link
            href='events'
            className='flex flex-row items-center border border-black w-fit px-4 py-2'
          >
            <TbArrowUpRight className='text-huddlepath-orange font-bold' />
            <p className='text-sm'>{t('viewAllEvents')}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
