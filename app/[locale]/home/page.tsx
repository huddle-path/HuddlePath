import { Header } from '@components/header/Header';
import { HeroCanvasAnimation } from '@components/hero-canvas-animation/HeroCanvasAnimation';
import { useTranslations } from 'next-intl';
import React from 'react';
import './home.css';
import { WhoWeAre } from '@components/who-we-are/WhoWeAre';
import { ExploreEvents } from '@components/explore-events/ExploreEvents';
import { MouseProvider } from '@components/hero-canvas-animation/MouseContext';
import { unstable_setRequestLocale } from 'next-intl/server';

const Home = () => {
  unstable_setRequestLocale('en');

  const t = useTranslations('home');
  const general = useTranslations('general');
  return (
    <main className='overflow-x-hidden'>
      <MouseProvider>
        <section className='h-screen w-screen relative overflow-hidden'>
          <div className='h-full w-full absolute top-0 -z-0'>
            <HeroCanvasAnimation />
          </div>

          <div className='w-full p-6 sticky top-0 z-50'>
            <Header useBlack={false} />
          </div>

          <div className='relative w-full h-full'>
            <div className='flex justify-center items-center h-full -mt-40 flex-col'>
              <div className='rounded-full bg-huddlepath-cyan h-96 w-96 absolute -z-0 opacity-20'></div>
              <p className='z-40 text-4xl md:text-6xl lg:text-8xl text-white font-extrabold tracking-wider'>
                [ Huddle path ]
              </p>
              <div className='rounded-full flex flex-row gap-4 justify-center p-4 font-extralight z-50'>
                <p className='text-huddlepath-orange'>{general('connect')}</p>
                <p className='text-huddlepath-gray'>{general('collaborate')}</p>
                <p className='text-huddlepath-orange'>{general('innovate')}</p>
              </div>
            </div>
          </div>
        </section>
      </MouseProvider>

      <section className='bg-white px-6 py-20'>
        <ExploreEvents />
      </section>
      <section className='bg-white px-6 py-20'>
        <WhoWeAre />
      </section>
    </main>
  );
};

export default Home;
