import RootLayout from '@/components/layout/RootLayout';
import { CartContextProvider } from '@/store/cart-context';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import Loader from '@/components/ui/Loader';

export default function App({ Component, pageProps }: AppProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SessionProvider session={pageProps.session}>
      <CartContextProvider>
        <RootLayout setSearchTerm={setSearchTerm}>
          <Loader>
            <Component {...pageProps} searchTerm={searchTerm} />
          </Loader>
        </RootLayout>
      </CartContextProvider>
    </SessionProvider>
  );
}
