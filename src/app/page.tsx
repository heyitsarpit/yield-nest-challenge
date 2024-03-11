'use client';

import { Header } from '~/components/Header';

export default function HomePage() {
  return (
    <div className='ml-0 h-full w-full'>
      <div className='fixed z-[150]'>
        <Header />
      </div>

      <main className={''}>Hello</main>
    </div>
  );
}
