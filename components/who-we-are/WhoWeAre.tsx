import { useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';
import { TbArrowUpRight } from 'react-icons/tb';
import student_image_url from '@public/whoWeAreImages/student_image_url.jpg';
import institution_image_url from '@public/whoWeAreImages/institution_image_url.jpg';
import startup_image_url from '@public/whoWeAreImages/startup_image_url.jpg';
import thought_leader_image_url from '@public/whoWeAreImages/thought_leader_image_url.jpg';
import you_image_url from '@public/whoWeAreImages/you_image_url.jpg';
import accelerator_image_url from '@public/whoWeAreImages/accelerator_image_url.jpg';
import './WhoWeAre.css';

type TInclusionProps = {
  image: StaticImageData;
  title: string;
  shortText?: string;
};

const INCLUSIONS: Array<TInclusionProps> = [
  {
    image: student_image_url,
    title: 'student',
    shortText: 'studentDescription',
  },
  {
    image: institution_image_url,
    title: 'institution',
    shortText: 'institutionDescription',
  },
  {
    image: startup_image_url,
    title: 'startup',
    shortText: 'startupDescription',
  },
  {
    image: accelerator_image_url,
    title: 'accelerator',
    shortText: 'acceleratorDescription',
  },
  {
    image: thought_leader_image_url,
    title: 'thoughtLeaders',
    shortText: 'thoughtLeadersDescription',
  },
  {
    image: you_image_url,
    title: 'you',
    shortText: 'youDescription',
  },
];

export const WhoWeAre = () => {
  const t = useTranslations('home');

  return (
    <div>
      <div className='text-center flex flex-col justify-center items-center gap-4'>
        <p className='text-md text-huddlepath-cyan font-semibold'>
          {t('whatWeOffer')}
        </p>
        <p
          className='text-xl lg:text-2xl font-bold max-w-screen-md uppercase tracking-tighter weBringTogether'
          dangerouslySetInnerHTML={{ __html: t.raw('weBringTogether') }}
        ></p>
      </div>

      <div className='flex flex-row gap-4 flex-wrap mt-10 justify-center'>
        {INCLUSIONS.map((inclusion) => (
          <InclusionCard
            {...inclusion}
            title={t(`inclusions.${inclusion.title}`)}
            shortText={t(`inclusions.${inclusion.shortText}`)}
            key={inclusion.title}
          />
        ))}
      </div>
    </div>
  );
};

const InclusionCard = ({ image, title, shortText }: TInclusionProps) => {
  return (
    <div className='w-full relative max-w-screen-sm' style={{ height: 600 }}>
      <Image alt={title} src={image} className='h-full w-full' />
      <div className='absolute z-30 bottom-0 p-6 h-full w-full flex flex-col place-content-end inclusion-card-transparent-bg'>
        <p className='text-4xl font-bold text-white'>{title}</p>
        {shortText && <p className='text-sm text-white'>{shortText}</p>}
        <TbArrowUpRight className='text-white font-bold mt-10 text-4xl' />
      </div>
    </div>
  );
};
