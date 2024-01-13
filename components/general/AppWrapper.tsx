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

  const isPublicPage = useMemo(() => {
    return LOCALES.find((locale) =>
      [`/${locale}`, `/${NAVIGATION.EXPLORE_EVENTS}`].includes(pathName)
    );
  }, [pathName]);

  console.log(pathName);

  return (
    <div className='flex flex-row w-full'>
      {session.data && !isPublicPage && (
        <div className='hidden md:block'>
          <SideBar />
        </div>
      )}
      <div className={`w-full h-screen`}>{children}</div>
    </div>
  );
};

export default AppWrapper;
