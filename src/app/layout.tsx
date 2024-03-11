import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';

import { WagmiContextProvider } from '~/components/Wallet/WagmiContext';
import { config } from '~/config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Yield Nest Challenge',
  description: 'Yield Nest Challenge',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang='en'>
      <body className={`bg-gray-950 font-sans text-gray-100 ${inter.variable}`}>
        <WagmiContextProvider initialState={initialState}>
          {children}
        </WagmiContextProvider>
      </body>
    </html>
  );
}
