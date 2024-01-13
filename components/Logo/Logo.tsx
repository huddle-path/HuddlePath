import Link from 'next/link';
import React from 'react';
import SVGWhiteLogo from '@public/logo-white.svg';
import SVGBlackLogo from '@public/logo-black.svg';

import Image from 'next/image';

interface Props {
  imageClasses?: string;
  textClasses?: string;
  logoOnly?: boolean;
  useBlackLogo?: boolean;
}

const Logo = ({
  imageClasses = 'w-6',
  textClasses = 'text-white font-bold',
  logoOnly = false,
  useBlackLogo = false,
}: Props) => {
  return (
    <Link href='/'>
      <div className='flex flex-row gap-2 items-center'>
        <Image
          src={useBlackLogo ? SVGBlackLogo : SVGWhiteLogo}
          alt='Huddlepath logo'
          className={imageClasses}
        />
        {!logoOnly && <p className={textClasses}>HuddlePath</p>}
      </div>
    </Link>
  );
};

export default Logo;
