import { AuthProvider, ProtectRoute } from '@contexts/AuthProvider';
import Compose from '@contexts/Compose';
import ThemeProvider from '@contexts/ThemeProvider';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import 'antd/dist/reset.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Compose components={[ThemeProvider, AuthProvider, ProtectRoute]}>
      <Component {...pageProps} />
    </Compose>
  );
}
