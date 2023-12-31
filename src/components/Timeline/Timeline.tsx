'use client';
import NextImage from 'next/image';
import {useEffect, useState} from 'react';

// @ts-ignore
const Timeline = ({ items }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000)

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (typeof document === 'object') {
      document.querySelector('.playing')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 right-0 bg-white dark:bg-black z-10 pl-9 py-2">
        {currentDate.toLocaleTimeString('nl-NL', { weekday: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric' })}
      </div>
      <ol className="relative border-l border-gray-200 dark:border-gray-700 mt-4">
        {/* @ts-ignore */}
        {items.map(({ id, title, heroImage, startDate, endDate }) => {
          const playing = currentDate > new Date(startDate) && currentDate < new Date(endDate);
          const finished = currentDate >= new Date(endDate);
          const upcoming = currentDate.getTime() - new Date(startDate).getTime() > -1200000 && currentDate.getTime() - new Date(startDate).getTime() < 0;

          let statusColor: 'bg-gray-500' |  'bg-green-500' | 'bg-yellow-500' | 'bg-gray-700'  = 'bg-gray-500';
          if (upcoming) {
            statusColor = 'bg-yellow-500';
          }
          if (playing) {
            statusColor = 'bg-green-500';
          }
          if (finished) {
            statusColor = 'bg-gray-700';
          }

          return (
            <li key={id}  className={`mb-2 ml-4 ${playing ? 'playing' : ''}`}>
              <div className="h-10 mt-n10" />
              <div className={`absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 ${statusColor}`}></div>
              <div className={`flex gap-4 ${finished ? 'opacity-30' : null}`}>
                <NextImage src={`https://lowlands.nl/${heroImage?.renditions?.xs?.src}`} alt={heroImage?.altText} width={80} height={40} />
                <div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">{new Date(startDate).toLocaleDateString('nl-NL', { hour: 'numeric', minute: 'numeric', weekday: 'short' })} - {new Date(endDate).toLocaleTimeString('nl-NL', { hour: 'numeric', minute: 'numeric' })}</time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </>

  );
};

export default Timeline;
