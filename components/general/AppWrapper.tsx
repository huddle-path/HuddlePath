'use client';
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import useAxiosConfig from '@lib/axiosConfig';
import { useGetAccessToken } from '@app/resources/auth/queries';
import SideBar from './SideBar';

const AppWrapper: React.FC<{ children?: ReactNode }> = ({ children }) => {
  useAxiosConfig();
  const session = useSession();
  useGetAccessToken({ enabled: Boolean(session.data) });

  return (
    <div className='flex flex-row w-full'>
      {session.data && (
        <div className='hidden md:block'>
          <SideBar />
        </div>
      )}
      <div className={`w-full h-screen`}>{children}</div>
    </div>
  );
};

export default AppWrapper;
