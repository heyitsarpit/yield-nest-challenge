'use client';

import { Header } from '~/components/Header';
import { TokenData } from '~/components/TokenData';

export default function HomePage() {
  return (
    <div className='ml-0 h-full w-full'>
      <div className='fixed z-[150]'>
        <Header />
      </div>

      <main className={'flex flex-col items-center justify-center pt-28'}>
        <TokenData />
      </main>
    </div>
  );
}
