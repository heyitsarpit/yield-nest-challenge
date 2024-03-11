'use client';

import { DepositETH } from '~/components/DepositETH';
import { Header } from '~/components/Header';
import { TokenData } from '~/components/TokenData';
import { useWeb3 } from '~/state/useWeb3';

export default function HomePage() {
  const { isActive } = useWeb3();

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
        {isActive ? (
          <div className='flex w-full flex-col gap-4 md:items-center'>
            <TokenData />
            <DepositETH />
          </div>
        ) : (
          <div>Connect your wallet to continue</div>
        )}
      </main>
    </div>
  );
}
