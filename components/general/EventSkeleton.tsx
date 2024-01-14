import { Skeleton } from '@components/ui/skeleton';

const EventSkeleton = () => {
  return (
    <div className='flex flex-col gap-4 pb-4 min-w-80 max-w-80 bg-white'>
      <Skeleton className='w-[300px] h-[200px]' />

      <div className='flex flex-col gap-2'>
        <Skeleton className='w-[70%] h-[20px]' />
        <Skeleton className='w-[90%] h-[29px]' />
        <Skeleton className='w-[60%] h-[14px]' />
      </div>

      <div className='mt-4 flex flex-row items-center w-fit'>
        <Skeleton className='w-[50px] h-[20px]' />
      </div>
    </div>
  );
};

export default EventSkeleton;
