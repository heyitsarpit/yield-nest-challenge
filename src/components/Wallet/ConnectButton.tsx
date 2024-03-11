'use client';
import { useWeb3Modal } from '@web3modal/wagmi/react';

import { useWeb3 } from '~/state/useWeb3';
import { truncatedAddress } from '~/utils/truncatedAddress';

export function ConnectButton() {
  const { open } = useWeb3Modal();
  const { isActive, address } = useWeb3();

  return (
    <button
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => open()}
      className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
    >
      {isActive ? truncatedAddress(address) : 'Connect'}
    </button>
  );
}
