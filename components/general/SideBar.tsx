'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCookies } from 'react-cookie';
import { SIDE_BAR_MENUS } from '@app/constants/side-menus';
import Logo from '@components/Logo/Logo';
import { Icons } from '@components/icons/icons';
import { useGetActiveRole } from '@app/resources/auth/queries';
import { IconType } from 'react-icons/lib';

const SideBar = () => {
  const { data: session } = useSession();
  const t = useTranslations('sidebarMenus');
  const pathName = usePathname();
  const [cookies, setCookie] = useCookies<'sidebarWidth'>(['sidebarWidth']);

  const { data: activeRoleResponse } = useGetActiveRole();

  const activeRole = useMemo(() => {
    return activeRoleResponse;
  }, [activeRoleResponse]);

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

      <div className='h-full flex flex-col justify-between'>
        <div className='flex items-center justify-center p-6'>
          <Logo logoOnly useBlackLogo />
        </div>

        <div className='h-full flex justify-center items-center'>
          <div className='flex flex-col justify-between h-fit w-full'>
            {activeRole && (
              <div className='flex flex-col gap-4 flex-auto'>
                {SIDE_BAR_MENUS[activeRole]?.map((m, i) => (
                  <SidebarMenu
                    key={m.label}
                    label={t(m.label.toString())}
                    ActiveIcon={m.ActiveIcon}
                    InActiveIcon={m.InActiveIcon}
                    route={m.route}
                    isActive={pathName.includes(m.route)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='flex justify-center p-4'>
          {session?.user?.email?.charAt(0)}
        </div>
      </div>
    </div>
  );
};

const SidebarMenu = ({
  label,
  ActiveIcon,
  InActiveIcon,
  isActive,
  route,
}: {
  label: string;
  ActiveIcon: IconType;
  InActiveIcon: IconType;
  isActive: boolean;
  route: string;
}) => {
  const [cookies] = useCookies(['sidebarWidth']);
  const width = cookies.sidebarWidth || 'w-60';

  const isMenuActive = useMemo(() => {
    if (isActive) {
      return 'text-huddlepath-cyan bg-cyan-50';
    }

    return 'text-gray-400';
  }, [isActive]);
  return (
    <Link
      href={route}
      className={`${
        isActive ? 'border-right border-r-2 border-huddlepath-cyan ' : ''
      }`}
    >
      <div
        className={`${isMenuActive} ${
          width === 'w-60' ? 'w-40' : 'w-12'
        } m-auto p-3 flex flex-row gap-2 items-center rounded-lg font-medium text-sm`}
      >
        <ActiveIcon
          className='h-6 w-6 text-huddlepath-cyan'
          style={{ display: isActive ? 'initial' : 'none' }}
        />
        <InActiveIcon
          className='h-6 w-6 text-gray-400'
          style={{ display: !isActive ? 'initial' : 'none' }}
        />

        {width === 'w-60' && <p className='ml-2'>{label}</p>}
      </div>
    </Link>
  );
};

export default SideBar;
