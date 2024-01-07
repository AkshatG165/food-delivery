import RootLayout from '@/components/layout/RootLayout';
import { CartContextProvider } from '@/store/cart-context';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <CartContextProvider>
      <RootLayout setSearchTerm={setSearchTerm}>
        <Component {...pageProps} searchTerm={searchTerm} />
      </RootLayout>
    </CartContextProvider>
  );
}
