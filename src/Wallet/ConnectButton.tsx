import { useWeb3Modal } from '@web3modal/wagmi/react';

export function ConnectButton() {
  // const { open } = useWeb3Modal();

  return (
    <>
      <button
      // onClick={() => open()}
      >
        Open Connect Modal
      </button>
    </>
  );
}