'use client';
import { ReactNode, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import useAxiosConfig from '@lib/axiosConfig';
import SideBar from './SideBar';
import { usePathname } from 'next/navigation';
import { LOCALES } from '@app/constants/translation';
import NAVIGATION from '@app/constants/navigation';

const AppWrapper: React.FC<{ children?: ReactNode }> = ({ children }) => {
  useAxiosConfig();
  const session = useSession();
  const pathName = usePathname();

  const publicPageList = useMemo(() => {
    const locales = LOCALES.map((locale) => [
      `/${locale}`,
      `/${locale}${NAVIGATION.SIGN_IN}`,
      `/${locale}${NAVIGATION.EXPLORE_EVENTS}`,
      `${NAVIGATION.EXPLORE_EVENTS}`,
      `${NAVIGATION.SIGN_IN}`,
    ]);

    return locales.flatMap((l) => l);
  }, []);

  const isPublicPage = useMemo(() => {
    return publicPageList.includes(pathName);
  }, [pathName]);

  return (
    <div className='flex flex-row w-full bg-huddlepath-gray h-full'>
      {session.data && !isPublicPage && (
        <div className='hidden md:block fixed'>
          <SideBar />
        </div>
      )}
      <div className={`w-full h-full ${!isPublicPage ? 'md:ml-20' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default AppWrapper;
