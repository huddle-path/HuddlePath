import Link from 'next/link';
import React from 'react';
import SVGLogo from '@public/logo-white.svg';
import Image from 'next/image';

interface Props {
  imageClasses?: string;
  textClasses?: string;
}

const Logo = ({
  imageClasses = 'w-6',
  textClasses = 'text-white font-bold',
}: Props) => {
  return (
    <Link href='/'>
      <div className='flex flex-row gap-2 items-center'>
        <Image src={SVGLogo} alt='Huddlepath logo' className={imageClasses} />
        <p className={textClasses}>HuddlePath</p>
      </div>
    </Link>
  );
};

export default Logo;
