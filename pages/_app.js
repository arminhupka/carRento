import React from 'react';
import {SessionProvider} from 'next-auth/react';
import '../styles/globals.css';
import CallNow from '../components/CallNow/CallNow';
import AuthProvider from '../providers/AuthProvider';

const App = ({Component, pageProps}) => (
  <>
    <CallNow />
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  </>
);
export default App;
