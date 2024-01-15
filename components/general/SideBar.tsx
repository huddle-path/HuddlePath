'use client';
import Logo from '@components/Logo/Logo';
import MiniProfileCard from './MiniProfileCard';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RiSettingsFill } from 'react-icons/ri';

const SideBar = () => {
  return (
    <div
      style={{ transition: 'width 0.1s ease-out' }}
      className='h-screen bg-huddlepath-gray relative w-20'
    >
      <div className='h-full flex flex-col justify-between'>
        <div className='flex items-center justify-center p-6'>
          <Logo logoOnly useBlackLogo />
        </div>

        <div className='flex justify-center p-4 flex-col items-center gap-8'>
          <IoMdNotificationsOutline className=' h-7 w-7 text-gray-400' />
          <RiSettingsFill className=' h-6 w-6 text-gray-400' />

          <MiniProfileCard />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
