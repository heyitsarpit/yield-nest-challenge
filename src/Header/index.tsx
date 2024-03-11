import { ConnectButton } from '~/Wallet/ConnectButton';

export function Header() {
  return (
    <header className='flex h-16 w-screen flex-col gap-1 bg-gray-200 backdrop-blur-xl'>
      <ConnectButton />
    </header>
  );
}
