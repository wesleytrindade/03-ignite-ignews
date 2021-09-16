import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { Provider as NextAuthProvider } from 'next-auth/client';

import '../styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>    
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
    <ToastContainer autoClose={3000} />
    </>
  )
}

export default MyApp
