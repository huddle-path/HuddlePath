import { Header } from '@components/header/Header';
import { HeroCanvasAnimation } from '@components/hero-canvas-animation/HeroCanvasAnimation';
import { useTranslations } from 'next-intl';
import React from 'react';
import './home.css';
import { WhoWeAre } from '@components/who-we-are/WhoWeAre';
import { ExploreEvents } from '@components/explore-events/ExploreEvents';

const Home = () => {
  const t = useTranslations('home');
  return (
    <main className='overflow-x-hidden'>
      <section className='h-screen w-screen relative overflow-hidden'>
        <div className='h-full w-full absolute top-0'>
          <HeroCanvasAnimation />
        </div>
        <div className='z-50 w-full p-6 sticky top-0'>
          <Header />
        </div>
      </section>
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
