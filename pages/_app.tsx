import RootLayout from '@/components/layout/RootLayout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import Loader from '@/components/ui/Loader';
import { Provider } from 'react-redux';
import store from '../store/index';

export default function App({ Component, pageProps }: AppProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <RootLayout setSearchTerm={setSearchTerm}>
          <Loader>
            <Component {...pageProps} searchTerm={searchTerm} />
          </Loader>
        </RootLayout>
      </Provider>
    </SessionProvider>
  );
}
