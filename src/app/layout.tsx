import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';

import { config } from '~/config';
import { WagmiContextProvider } from '~/Wallet/WagmiContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Create T3 App',
  description: 'Generated by create-t3-app',
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
      <body className={`bg-gray-950 font-sans ${inter.variable}`}>
        <WagmiContextProvider initialState={initialState}>
          {children}
        </WagmiContextProvider>
      </body>
    </html>
  );
}
