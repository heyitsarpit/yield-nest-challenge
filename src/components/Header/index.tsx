/* eslint-disable @next/next/no-img-element */

import { ConnectButton } from '~/components/Wallet/ConnectButton';

export function Header() {
  return (
    <header className='flex h-16 w-screen items-center justify-between gap-1 bg-gray-900/20 px-6 backdrop-blur-xl md:px-10'>
      <img src='/images/UNI.svg' alt='UNI' className='h-10 w-10' />
      <ConnectButton />
    </header>
  );
}
