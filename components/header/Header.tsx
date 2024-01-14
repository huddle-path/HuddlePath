'use client';
import React from 'react';
import Link from 'next/link';
import NAVIGATION from '@app/constants/navigation';
import { TbArrowUpRight } from 'react-icons/tb';
import Logo from '@components/Logo/Logo';
import { useTranslations } from 'next-intl';

export const Header = ({ useBlack }: { useBlack: boolean }) => {
  const t = useTranslations('header');

  return (
    <div className='transition-all flex flex-row justify-between text-white items-center'>
      <Logo
        useBlackLogo={useBlack ? true : false}
        textClasses={useBlack ? 'text-black' : 'text-white'}
      />

      <div className='lg:pr-4'>
        <Link
          href={NAVIGATION.MY_ACCOUNT}
          className='flex flex-row items-center border px-4 py-2'
        >
          <TbArrowUpRight className='text-huddlepath-orange font-bold' />
          <p className={`text-sm ${useBlack ? 'text-black' : 'text-white'}`}>
            {t('myAccount')}
          </p>
        </Link>
      </div>
    </div>
  );
};
