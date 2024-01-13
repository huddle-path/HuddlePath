import Image from 'next/image';
import React, { useMemo } from 'react';
import Logo from '@public/logo-white.svg';
import Link from 'next/link';
import NAVIGATION from '@app/constants/navigation';
import { TbArrowUpRight } from 'react-icons/tb';
import { useTranslations } from 'next-intl';

export const Header = () => {
  const t = useTranslations('header');
  const createEventRoute = useMemo(() => {
    return NAVIGATION.CREATE_EVENT;
  }, []);

  return (
    <div className='flex flex-row justify-between text-white items-center'>
      <Link href='/'>
        <div className='flex flex-row gap-2'>
          <Image src={Logo} alt='Huddlepath logo' className='w-6' />
          <p className='text-white font-bold'>HuddlePath</p>
        </div>
      </Link>

      <div className='lg:pr-4'>
        <Link
          href={createEventRoute}
          className='flex flex-row items-center border px-4 py-2'
        >
          <TbArrowUpRight className='text-huddlepath-orange font-bold' />
          <p className='text-sm'>{t('createEvent')}</p>
        </Link>
      </div>
    </div>
  );
};
