import { keepPreviousData } from '@tanstack/react-query';
import { erc20Abi } from 'viem';
import { goerli } from 'viem/chains';
import { useReadContracts } from 'wagmi';

import { YNETH_ABI } from '~/config/ABI/ynETH.abi';
import { tokens, type TokenSymbol } from '~/config/tokens';
import { useWeb3 } from '~/state/useWeb3';

export function useTokenData(token: TokenSymbol, chain = goerli) {
  const { address } = useWeb3();

  const abi = token === 'ynETH' ? YNETH_ABI : erc20Abi;

  const tokenAddress = tokens[token].address[chain.id];

  const query = useReadContracts({
    query: {
      enabled: !!address,
      staleTime: 30_000,
      refetchInterval: 30_000,
      placeholderData: keepPreviousData,
    },
    contracts: [
      {
        address: tokenAddress as `0x${string}`,
        abi,
        chainId: chain.id,
        args: [address!],
        functionName: 'balanceOf',
      },
      {
        address: tokenAddress as `0x${string}`,
        abi,
        chainId: chain.id,
        functionName: 'totalSupply',
      },
      {
        address: tokenAddress as `0x${string}`,
        abi,
        chainId: chain.id,
        functionName: 'symbol',
      },
      {
        address: tokenAddress as `0x${string}`,
        abi,
        chainId: chain.id,
        functionName: 'name',
      },
      {
        address: tokenAddress as `0x${string}`,
        abi,
        chainId: chain.id,
        functionName: 'decimals',
      },
    ],
  });

  const tokenData = query.data;

  return {
    ...query,
    tokenAddress,
    userBalance: tokenData?.[0].result ?? 0n,
    tokenSupply: tokenData?.[1].result ?? 0n,
    symbol: tokenData?.[2].result ?? '',
    tokenName: tokenData?.[3].result ?? '',
    tokenDecimals: tokenData?.[4].result ?? 18,
  };
}
