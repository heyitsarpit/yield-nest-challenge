import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { arbitrum, goerli, mainnet } from 'wagmi/chains';

import { env } from '~/env';

// Get projectId at https://cloud.walletconnect.com
export const projectId = env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
  name: 'Yield Nest',
  description: 'Yield Nest Challenge',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const SupportedChains = [arbitrum, goerli, mainnet] as const;
export type SupportedChainsIds = (typeof SupportedChains)[number]['id'];

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [arbitrum, goerli, mainnet], // required
  projectId, // required
  metadata, // required
  ssr: true,
  storage: createStorage({ storage: cookieStorage }),
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
});
