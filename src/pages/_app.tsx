import '../styles/globals.css'
import {Header} from '../components/header/index'
import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
     <Header />
      <Component {...pageProps} />
    </SessionProvider>

  )
}
