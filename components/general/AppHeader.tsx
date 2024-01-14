import NAVIGATION from '@app/constants/navigation';
import Logo from '@components/Logo/Logo';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { TbArrowUpRight } from 'react-icons/tb';

const AppHeader = () => {
  const t = useTranslations('header');

  const LINKS = [
    {
      href: NAVIGATION.EXPLORE_EVENTS,
      label: t('explore'),
      color: 'text-huddlepath-cyan',
    },
    {
      href: NAVIGATION.ARCHIVED,
      label: t('archived'),
      color: 'text-huddlepath-orange',
    },
  ];
  return (
    <div className='flex items-center justify-between sm:justify-end sticky top-0 w-full'>
      <div className='flex items-center justify-center p-6 sm:hidden'>
        <Logo logoOnly useBlackLogo />
      </div>

      <div className='flex gap-2 text-sm font-light tracking-tight justify-end p-4 items-center'>
        {LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className='flex flex-row items-center px-4 py-2'
          >
            <TbArrowUpRight className={`${link.color} font-bold`} />
            <p className='text-sm text-huddlepath-black'>{link.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppHeader;
