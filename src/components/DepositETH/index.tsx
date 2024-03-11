'use client';

import { useState } from 'react';
import { isAddress } from 'viem';
import { goerli } from 'viem/chains';
import { usePublicClient, useWalletClient } from 'wagmi';

import { YNETH_ABI } from '~/config/ABI/ynETH.abi';
import { useTokenData } from '~/state/useTokenData';
import { useWeb3 } from '~/state/useWeb3';

const YNETH_ADDRESS = '0x0091626e15caFd0F6Bc96dE7F12CEe444c0a212d';

type Status = 'idle' | 'submitting' | 'executing' | 'success' | 'failed';

export function DepositETH() {
  const [address, setAddress] = useState('');

  const { chainID } = useWeb3();
  const { refetch: refetchTokenData } = useTokenData('ynETH');
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const [status, setStatus] = useState<Status>('idle'); // can be used for driving toast and loading spinner
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (!chainID || !walletClient || !address) return;
    if (!isAddress(address, { strict: false })) {
      setError('Invalid address');
      return;
    }

    try {
      setStatus('submitting');
      if (chainID !== goerli.id) {
        await walletClient?.switchChain({ id: goerli.id });
      }

      const hash = await walletClient.writeContract({
        address: YNETH_ADDRESS,
        abi: YNETH_ABI,
        functionName: 'depositETH',
        args: [address],
      });

      setStatus('executing');

      await publicClient?.waitForTransactionReceipt({ hash });

      setStatus('success');
    } catch (error) {
      setStatus('failed');
      console.error(error);
    } finally {
      await refetchTokenData();
    }
  };

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={() => handleSubmit()}
      className='flex w-[20rem] flex-col gap-6 rounded-lg bg-gray-900 p-4'
    >
      <div>Deposit ETH</div>

      <input
        type='string'
        onChange={(e) => setAddress(e.target.value)}
        className='w-full rounded border border-gray-800 bg-gray-800 px-2 py-1'
        placeholder='Enter address'
      />

      {error && <div className='text-red-500'>{error}</div>}

      <button
        type='submit'
        className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      >
        Deposit
      </button>
    </form>
  );
}
