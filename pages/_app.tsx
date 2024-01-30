import RootLayout from '@/components/layout/RootLayout';
import { CartContextProvider } from '@/store/cart-context';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import Loader from '@/components/ui/Loader';
import Success from './success';

export default function App({ Component, pageProps }: AppProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const isSuccess = Component === Success;

  return (
    <SessionProvider session={pageProps.session}>
      <CartContextProvider>
        {!isSuccess ? (
          <RootLayout setSearchTerm={setSearchTerm}>
            <Loader>
              <Component {...pageProps} searchTerm={searchTerm} />
            </Loader>
          </RootLayout>
        ) : (
          <Loader>
            <Component {...pageProps} searchTerm={searchTerm} />
          </Loader>
        )}
      </CartContextProvider>
    </SessionProvider>
  );
}
