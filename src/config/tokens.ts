import { arbitrum, goerli, mainnet } from 'wagmi/chains';

export const ZeroAddress = '0x0000000000000000000000000000000000000000';

export type Token = {
  address: {
    [arbitrum.id]: string | undefined;
    [goerli.id]: string | undefined;
    [mainnet.id]: string | undefined;
  };
};

export const tokens = {
  USDC: {
    address: {
      [arbitrum.id]: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
      [goerli.id]: undefined,
      [mainnet.id]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    },
  },
  WETH: {
    address: {
      [arbitrum.id]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      [goerli.id]: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
      [mainnet.id]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    },
  },
} as const satisfies Record<string, Token>;

export type TokenSymbol = keyof typeof tokens;

export const ListedTokens = Object.values(tokens);
