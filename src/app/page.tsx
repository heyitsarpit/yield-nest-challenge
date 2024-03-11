'use client';

import { DepositETH } from '~/components/DepositETH';
import { Header } from '~/components/Header';
import { TokenData } from '~/components/TokenData';

export default function HomePage() {
  return (
    <div className='ml-0 h-full w-full'>
      <div className='fixed z-[150]'>
        <Header />
      </div>

      <main
        className={
          'flex flex-col items-center justify-center px-6 pt-28 md:px-10'
        }
      >
        <TokenData />
        <DepositETH />
      </main>
    </div>
  );
}
