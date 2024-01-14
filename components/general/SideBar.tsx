'use client';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import Logo from '@components/Logo/Logo';
import { useGetActiveRole } from '@app/resources/auth/queries';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetLoggedInUser } from '@app/resources/user/queries';

const SideBar = () => {
  const { data: loggedInUserResponse } = useGetLoggedInUser();
  const t = useTranslations('sidebarMenus');
  const { data: activeRoleResponse } = useGetActiveRole();

  const activeRole = useMemo(() => {
    return activeRoleResponse;
  }, [activeRoleResponse]);

  const loggedInUser = useMemo(() => {
    return loggedInUserResponse;
  }, [loggedInUserResponse]);
  return (
    <div
      style={{ transition: 'width 0.1s ease-out' }}
      className='h-screen bg-huddlepath-gray relative w-20'
    >
      <div className='h-full flex flex-col justify-between'>
        <div className='flex items-center justify-center p-6'>
          <Logo logoOnly useBlackLogo />
        </div>

        <div className='flex justify-center p-4'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>
              {loggedInUser?.firstName?.charAt(0)}
              {loggedInUser?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
