import NAVIGATION from '@app/constants/navigation';
import { IEvent } from '@app/resources/event/types';
import { Badge } from '@components/ui/badge';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { TbArrowUpRight } from 'react-icons/tb';

const Event = (event: IEvent) => {
  const t = useTranslations('general');
  return (
    <Link
      href={`${NAVIGATION.EXPLORE_EVENTS}/${event._id}`}
      className='flex flex-col gap-4 pb-4 border-huddlepath-black min-w-80 max-w-80'
      style={{ borderBottom: '1px solid' }}
    >
      <div className='relative'>
        <Badge className='bg-huddlepath-black absolute m-4 rounded-sm p-2'>
          {event.tag}
        </Badge>

        <Image
          src={decodeURIComponent(event.imageUrl)}
          alt={event.title}
          className='w-80 h-60 object-cover'
          width={80}
          height={80}
          loading='lazy'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-sm'>{format(new Date(event.date), 'PPP')}</p>
        <p className='text-2xl font-bold'>{event.title}</p>
        <p className='text-xs'>{event.location}</p>
      </div>

      <div className='mt-4'>
        <div className='flex flex-row items-center w-fit'>
          <TbArrowUpRight className='text-huddlepath-orange font-bold' />
          <p className='text-sm'>{t('readMore')}</p>
        </div>
      </div>
    </Link>
  );
};

export default Event;
