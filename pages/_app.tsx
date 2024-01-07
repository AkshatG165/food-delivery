import RootLayout from '@/components/layout/RootLayout';
import { CartContextProvider } from '@/store/cart-context';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </CartContextProvider>
  );
}
