import { useAccount } from 'wagmi';

export default function useWeb3() {
  const { address, chainId, isConnected } = useAccount();

  return {
    address,
    chainID: chainId,
    isActive: isConnected,
  };
}
