import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import { Providers } from './providers';
import { ThemeProvider } from '../context/themeProvider';
import Layout from '../components/layout/layout';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </ThemeProvider>
  );
}

export default App;
