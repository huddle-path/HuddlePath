import NAVIGATION from '@app/constants/navigation';
import { useGetLoggedInUser } from '@app/resources/user/queries';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useMemo } from 'react';

const MiniProfileCard = () => {
  const { data: loggedInUserResponse } = useGetLoggedInUser();

  const loggedInUser = useMemo(() => {
    return loggedInUserResponse;
  }, [loggedInUserResponse]);

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Avatar className='border-2 border-huddlepath-orange'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>
              {loggedInUser?.firstName?.charAt(0)}
              {loggedInUser?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className='m-4 max-w-52'>
          <div className='flex flex-col items-center'>
            <Image
              className='w-24 h-24 mb-3 rounded-full shadow-lg border-2 border-huddlepath-cyan'
              src='https://github.com/shadcn.png'
              width={10}
              height={10}
              alt=''
            />
            <h5 className='mb-1 text-xl font-medium text-gray-900'>
              Israel Ayokunnu
            </h5>
            <span className='text-sm text-gray-500'>FS Dev</span>
            <div className='flex mt-4 md:mt-6'>
              <Button
                onClick={() =>
                  signOut({ callbackUrl: NAVIGATION.SIGN_IN, redirect: true })
                }
              >
                Logout
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MiniProfileCard;
