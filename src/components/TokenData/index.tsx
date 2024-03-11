import { formatUnits } from 'viem';

import { useTokenData } from '~/state/useTokenData';
import { printToken } from '~/utils/print';

export function TokenData() {
  const {
    isLoading,
    symbol,
    tokenName,
    tokenDecimals,
    tokenSupply,
    userBalance,
  } = useTokenData('ynETH');

  const data = [
    {
      label: 'Symbol',
      value: symbol,
    },
    {
      label: 'Name',
      value: tokenName,
    },
    {
      label: 'Decimals',
      value: tokenDecimals,
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col gap-4 md:gap-8'>
      <dl className='flex flex-col gap-4 md:flex-row md:gap-8'>
        {data.map(({ label, value }) => (
          <div
            key={label}
            className='flex w-full flex-col gap-1 rounded-lg border border-gray-700 p-4 md:w-[15rem]'
          >
            <dt className='font-semibold'>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <dl className='flex flex-col gap-4'>
        <div>
          <dt className='font-semibold'>User Balance</dt>
          <dd>{printToken(formatUnits(userBalance, tokenDecimals), symbol)}</dd>
        </div>

        <div>
          <dt className='font-semibold'>Total Supply</dt>
          <dd>{printToken(formatUnits(tokenSupply, tokenDecimals), symbol)}</dd>
        </div>
      </dl>
    </div>
  );
}
