import { formatUnits } from 'viem';

import { useTokenData } from '~/state/useTokenData';
import { printToken } from '~/utils/print';

export function TokenData() {
  const { data, symbol, tokenName, tokenDecimals, tokenSupply, userBalance } =
    useTokenData('ynETH');

  const tokenData = [
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

  if (!data) {
    return <div className='h-[10rem] w-full'>Loading...</div>;
  }

  return (
    <div className='flex flex-col gap-4 md:gap-8'>
      <dl className='flex flex-col gap-4 md:flex-row md:gap-8'>
        {tokenData.map(({ label, value }) => (
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
          <dd>
            {printToken(formatUnits(userBalance, tokenDecimals), symbol, {
              maximumFractionDigits: 10,
            })}
          </dd>
        </div>

        <div>
          <dt className='font-semibold'>Total Supply</dt>
          <dd>{printToken(formatUnits(tokenSupply, tokenDecimals), symbol)}</dd>
        </div>
      </dl>
    </div>
  );
}
