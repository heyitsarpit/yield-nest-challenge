'use client';

import { useState } from 'react';
import {
  createPublicClient,
  createWalletClient,
  custom,
  formatUnits,
  http,
  parseUnits,
} from 'viem';
import { goerli } from 'viem/chains';
import { useBalance, useWalletClient } from 'wagmi';

import { YNETH_ABI } from '~/config/ABI/ynETH.abi';
import { useTokenData } from '~/state/useTokenData';
import { useWeb3 } from '~/state/useWeb3';
import { isNumeric } from '~/utils';
import { printToken } from '~/utils/print';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type EthereumProvider = { request(...args: any): Promise<any> };
  interface Window {
    ethereum: EthereumProvider;
  }
}

const YNETH_ADDRESS = '0x0091626e15caFd0F6Bc96dE7F12CEe444c0a212d';

type Status = 'idle' | 'submitting' | 'executing' | 'success' | 'failed';

const chain = goerli; // can be a prop
export function DepositETH() {
  const [amount, setAmount] = useState('');

  const { address, chainID: currentChain, isActive } = useWeb3();
  const { refetch: refetchTokenData } = useTokenData('ynETH');
  const { data: walletClient } = useWalletClient();

  const [status, setStatus] = useState<Status>('idle'); // can be used for driving toast and loading spinner
  const [error, setError] = useState('');

  const { data: ethBalance, refetch: refetchEthBalance } = useBalance({
    address: address,
    chainId: chain.id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNumeric(e.target.value)) return;

    let value = e.target.value;
    if (value === '.') {
      value = '0.';
    }

    setAmount(value);
  };

  const handleSubmit = async () => {
    setError('');

    if (!currentChain || !walletClient || !address || !amount) {
      setError('Error Occurred');
      return;
    }

    try {
      setStatus('submitting');
      if (currentChain !== chain.id) {
        await walletClient?.switchChain({ id: chain.id });
      }

      const client = createWalletClient({
        chain: chain,
        transport: custom(window.ethereum),
      });

      const publicClient = createPublicClient({
        chain: chain,
        transport: http(),
      });

      const hash = await client.writeContract({
        address: YNETH_ADDRESS,
        account: address,
        abi: YNETH_ABI,
        functionName: 'depositETH',
        args: [address],
        value: parseUnits(amount, 18),
      });

      setStatus('executing');

      await publicClient.waitForTransactionReceipt({ hash });

      setStatus('success');
    } catch (error) {
      setStatus('failed');
      console.error(error);
    } finally {
      refetchTokenData();
      refetchEthBalance();
      setAmount('');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const ethBalanceStr = formatUnits(ethBalance?.value ?? 0n, 18);
  const isBalanceSufficient =
    (ethBalance?.value ?? 0n) >= parseUnits(amount, 18);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className='flex w-[20rem] flex-col gap-6 rounded-lg bg-gray-900 p-4'
    >
      <div className='flex items-center justify-between'>
        <div>Deposit ETH</div>
        <div className='text-sm text-gray-400'>
          {status === 'idle' ? '' : status}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <dl className='flex items-center justify-between text-sm'>
          <dt>Balance</dt>
          <dd>{printToken(ethBalanceStr, 'ETH')}</dd>
        </dl>

        <div className='flex gap-1 rounded border border-gray-800 bg-gray-800 p-[1px] '>
          <input
            type='string'
            value={amount}
            onChange={handleChange}
            placeholder='Enter ETH amount'
            data-balance-low={!isBalanceSufficient ? 'true' : ''}
            className={
              'w-full rounded bg-gray-800 px-2 py-1 focus-visible:outline focus-visible:outline-blue-500 data-[balance-low="true"]:outline-red-500'
            }
          />
          <button
            type='button'
            disabled={!isActive || status !== 'idle'}
            className='bg-amber-500 px-2 py-1 text-gray-900 hover:text-gray-500 disabled:bg-gray-600 disabled:text-gray-500'
            onClick={() => setAmount(ethBalanceStr)}
          >
            MAX
          </button>
        </div>

        {error && <div className='text-red-500'>{error}</div>}
      </div>

      <button
        type='submit'
        disabled={!isActive || status !== 'idle' || !isBalanceSufficient}
        className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-800 disabled:text-gray-400'
      >
        Deposit
      </button>
    </form>
  );
}
