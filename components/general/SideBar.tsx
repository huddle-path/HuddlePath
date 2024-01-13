'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ReactNode, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCookies } from 'react-cookie';
import { SIDE_BAR_MENUS } from '@app/constants/side-menus';
import Logo from '@components/Logo/Logo';
import { Icons } from '@components/icons/icons';
import { USER_ROLES_TYPE } from '@app/resources/user/types';

const SideBar = () => {
  const { data: session } = useSession();
  const t = useTranslations('sidebarMenus');
  const pathName = usePathname();
  const [cookies, setCookie] = useCookies<'sidebarWidth' | 'activeRole'>([
    'sidebarWidth',
    'activeRole',
  ]);

  const activeRole = useMemo(() => {
    return cookies.activeRole as USER_ROLES_TYPE;
  }, [cookies.activeRole]);

  const width = cookies.sidebarWidth || 'w-60';

  const handleSetWidth = () => {
    const newWidth = width === 'w-20' ? 'w-60' : 'w-20';
    setCookie('sidebarWidth', newWidth, { path: '/' });
  };

  useEffect(() => {
    if (!cookies.sidebarWidth) {
      setCookie('sidebarWidth', 'w-60', { path: '/' });
    }
  }, [setCookie, cookies.sidebarWidth]);

  return (
    <div
      style={{ transition: 'width 0.1s ease-out' }}
      className={`h-screen bg-white relative border-r border-gray-300 ${width}`}
    >
      <button
        style={{ zIndex: 9999 }}
        onClick={handleSetWidth}
        className='hidden md:block absolute right-0 rounded-full bg-white p-1 border border-gray-300 -mr-3 top-[67px]'
      >
        <Icons.chevronLeft
          className={`text-gray-400 transition-transform duration-300 w-4 h-4 ${
            width && width === 'w-20' ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      <div className='h-full flex flex-col'>
        <div className='flex items-center justify-center p-6'>
          <Logo logoOnly useBlackLogo />
        </div>

        <div className='flex flex-col justify-between h-full'>
          {activeRole && (
            <div className='p-4 flex flex-col gap-2 flex-auto'>
              {SIDE_BAR_MENUS[activeRole].map((m, i) => (
                <SidebarMenu
                  key={m.label}
                  label={t(m.label.toString())}
                  icon={m.icon}
                  route={m.route}
                  isActive={pathName === m.route}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SidebarMenu = ({
  label,
  icon,
  isActive,
  route,
}: {
  label: string;
  icon: ReactNode;
  isActive: boolean;
  route: string;
}) => {
  const [cookies] = useCookies(['sidebarWidth']);
  const width = cookies.sidebarWidth || 'w-60';

  const isMenuActive = useMemo(() => {
    if (isActive) {
      return 'text-emerald-800';
    }

    return 'text-gray-500';
  }, [isActive]);
  return (
    <Link
      href={route}
      className={`${isMenuActive} flex flex-row gap-2 items-center p-3 rounded-lg font-medium text-sm `}
    >
      {/* <Icon name={icon} className='h-6 w-6' /> */}
      {width === 'w-60' && <p>{label}</p>}
    </Link>
  );
};

export default SideBar;
